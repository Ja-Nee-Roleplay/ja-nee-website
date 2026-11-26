<?php
// Same-origin FiveM status relay for the cPanel site. Connection settings are generated from siteConfig.js.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');

function respondWithStatus($payload, $httpStatus = 200)
{
    http_response_code($httpStatus);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function parsePlayerCount($value)
{
    if (!is_numeric($value)) {
        return null;
    }

    $count = (int) $value;
    return $count >= 0 && (string) $count === (string) $value ? $count : null;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respondWithStatus(array('status' => 'unknown'), 405);
}

$serverHost = __FIVEM_SERVER_HOST__;
$serverPort = __FIVEM_SERVER_PORT__;
$cfxJoinCode = __FIVEM_CFX_JOIN_CODE__;
$cfxApiBaseUrl = __FIVEM_CFX_API_BASE_URL__;

function fetchStatusJson($url, $timeoutSeconds)
{
    $responseBody = false;
    $httpStatus = 0;

    if (function_exists('curl_init')) {
        $request = curl_init($url);
        curl_setopt_array($request, array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => min(3, $timeoutSeconds),
            CURLOPT_TIMEOUT => $timeoutSeconds,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HTTPHEADER => array('Accept: application/json'),
        ));
        $responseBody = curl_exec($request);
        $httpStatus = (int) curl_getinfo($request, CURLINFO_HTTP_CODE);
        curl_close($request);
    } else {
        $context = stream_context_create(array(
            'http' => array(
                'method' => 'GET',
                'timeout' => $timeoutSeconds,
                'ignore_errors' => true,
                'header' => "Accept: application/json\r\n",
            ),
        ));
        $responseBody = @file_get_contents($url, false, $context);
        if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) {
            $httpStatus = (int) $matches[1];
        }
    }

    return array('body' => $responseBody, 'httpStatus' => $httpStatus);
}

function parseStatusJson($response)
{
    if ($response['body'] === false || $response['httpStatus'] < 200 || $response['httpStatus'] >= 300) {
        return null;
    }

    $payload = json_decode($response['body'], true);
    if (!is_array($payload)) {
        return null;
    }

    $data = isset($payload['Data']) && is_array($payload['Data'])
        ? $payload['Data']
        : (isset($payload['data']) && is_array($payload['data']) ? $payload['data'] : $payload);

    $players = parsePlayerCount(isset($data['clients']) ? $data['clients'] : (isset($data['players']) ? $data['players'] : null));
    $maxPlayers = parsePlayerCount(isset($data['sv_maxclients']) ? $data['sv_maxclients'] : (isset($data['svMaxclients']) ? $data['svMaxclients'] : (isset($data['maxPlayers']) ? $data['maxPlayers'] : null)));
    $reportedState = isset($data['status']) && is_string($data['status'])
        ? strtolower(trim($data['status']))
        : (isset($data['state']) && is_string($data['state']) ? strtolower(trim($data['state'])) : '');
    if (in_array($reportedState, array('online', 'offline', 'restarting', 'maintenance'), true)) {
        return array('status' => $reportedState, 'players' => $players, 'maxPlayers' => $maxPlayers);
    }

    $hasHostname = isset($data['hostname']) && is_string($data['hostname']) && $data['hostname'] !== '';

    if ($players === null && $maxPlayers === null && !$hasHostname) {
        return null;
    }

    return array('status' => 'online', 'players' => $players, 'maxPlayers' => $maxPlayers);
}

// Try the CFX listing over HTTPS first so cPanel does not need to reach the game port.
$cfxResponse = null;
if ($cfxJoinCode !== '' && preg_match('/^[a-z0-9]{5,12}$/i', $cfxJoinCode)) {
    $cfxResponse = fetchStatusJson($cfxApiBaseUrl . rawurlencode($cfxJoinCode), 3);
    $cfxStatus = parseStatusJson($cfxResponse);
    if ($cfxStatus !== null) {
        respondWithStatus($cfxStatus);
    }
}

// Keep the direct dynamic.json request as a fallback if the CFX listing cannot be verified.
$directEndpoint = 'http://' . $serverHost . ':' . $serverPort . '/dynamic.json';
$directResponse = fetchStatusJson($directEndpoint, 3);
$directStatus = parseStatusJson($directResponse);
if ($directStatus !== null) {
    respondWithStatus($directStatus);
}

// A CFX 404 plus no valid direct endpoint response means the server is not available.
// A valid direct response above still takes priority if the listing is temporarily missing.
if (isset($cfxResponse['httpStatus']) && (int) $cfxResponse['httpStatus'] === 404) {
    respondWithStatus(array('status' => 'offline'));
}

respondWithStatus(array(
    'status' => 'unknown',
));
