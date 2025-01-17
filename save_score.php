<?php
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['name']) && isset($data['score']) && isset($data['correct']) && isset($data['wrong'])) {
    $scoreData = [
        'name' => $data['name'],
        'score' => $data['score'],
        'correct' => $data['correct'],
        'wrong' => $data['wrong']
    ];
    $jsonData = file_get_contents('scores.json');
    $scores = json_decode($jsonData, true);
    $scores[] = $scoreData;
    file_put_contents('scores.json', json_encode($scores, JSON_PRETTY_PRINT));
    echo 'Score saved successfully!';
} else {
    echo 'Invalid data!';
}
?>
