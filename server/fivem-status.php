<?php
// Same-origin FiveM status relay for the cPanel site. Host and port are generated from siteConfig.js.
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
$endpoint = 'http://' . $serverHost . ':' . $serverPort . '/dynamic.json';
$responseBody = false;
$httpStatus = 0;

if (function_exists('curl_init')) {
    $request = curl_init($endpoint);
    curl_setopt_array($request, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_TIMEOUT => 6,
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
            'timeout' => 6,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\n",
        ),
    ));
    $responseBody = @file_get_contents($endpoint, false, $context);
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) {
        $httpStatus = (int) $matches[1];
    }
}

if ($responseBody === false || $httpStatus < 200 || $httpStatus >= 300) {
    respondWithStatus(array(
        'status' => 'unknown',
        'message' => $responseBody === false
            ? 'The hosting server could not reach FiveM on the configured endpoint.'
            : 'FiveM returned HTTP ' . $httpStatus . '.',
    ));
}

$data = json_decode($responseBody, true);
if (!is_array($data)) {
    respondWithStatus(array(
        'status' => 'unknown',
        'message' => 'FiveM returned data that was not valid JSON.',
    ));
}

$players = parsePlayerCount(isset($data['clients']) ? $data['clients'] : null);
$maxPlayers = parsePlayerCount(isset($data['sv_maxclients']) ? $data['sv_maxclients'] : null);
$hasHostname = isset($data['hostname']) && is_string($data['hostname']) && $data['hostname'] !== '';

if ($players === null && $maxPlayers === null && !$hasHostname) {
    respondWithStatus(array(
        'status' => 'unknown',
        'message' => 'FiveM returned JSON without recognizable server or player fields.',
    ));
}

respondWithStatus(array(
    'status' => 'online',
    'players' => $players,
    'maxPlayers' => $maxPlayers,
));
