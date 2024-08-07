<?php
require 'vendor/autoload.php';

use Realm\Configuration;
use Realm\Realm;

$configuration = new Configuration();
$realm = new Realm($configuration);
$realm->connect();

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$dob = $data['dob'];
$address = $data['address'] ?? '';

$realm->create('User', [
    'name' => $name,
    'dob' => $dob,
    'address' => $address,
]);

echo json_encode(['success' => true]);
?>
