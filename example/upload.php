<?php
header('Content-Type: application/json');

//http_response_code(500);
echo '{
  "type": "file",
  "file": {
    "ref": ' . rand(100, 900) . ',
    "name": "bestand.jpg",
    "thubmnail": null,
    "type": "the/mimetype",
    "error": "jouw error message"
  }
}';