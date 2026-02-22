<?php
header('Content-Type: application/json');

$usuarios = [
    ["id" => 1, "nombre" => "Ana", "edad" => 23],
    ["id" => 2, "nombre" => "Luis", "edad" => 28],
    ["id" => 3, "nombre" => "María", "edad" => 21]
];

// Simulamos un pequeño retardo
sleep(1);

echo json_encode($usuarios);
