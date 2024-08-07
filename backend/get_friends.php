<?php
require 'vendor/autoload.php';

use Realm\Configuration;
use Realm\Realm;

$configuration = new Configuration();
$realm = new Realm($configuration);
$realm->connect();

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

$friends = $realm->findAll('Friend', ['user_id' => $user_id]);

echo json_encode($friends);
?>
