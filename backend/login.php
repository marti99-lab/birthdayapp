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

$user = $realm->findOne('User', ['name' => $name, 'dob' => $dob]);

if ($user) {
    echo json_encode(['success' => true, 'user' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>
