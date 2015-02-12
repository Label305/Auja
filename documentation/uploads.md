---
layout: documentation
title: "Uploads"
---

Uploads
=====

- [Introduction](#introduction)
- [File](#file)
- [Form item](#form-item)
- [Upload Request](#upload-request)
- [Upload Response](#upload-response)
- [Form Request](#form-request)


Introduction
-----

Auja has a file uploader that uses the [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload) library. Some of the features are:

* Multiple files and single files
* Thumbnails
* Validation messages
* Uploads happen before form submission
* Drag 'n drop

File
----

Files are represented by the `File` object. These file objects are used in the creating a `File Select` form item and in describing upload responses.

```json
{
    "type": "file",
    "file": {
        "ref": 123,
        "name": "file.jpg",
        "thubmnail": "images/file_thumb.jpg",
        "type": "the/mimetype"
    }
}
```

ref | unique `int` or `string` | Unique identifier for the uploaded file
name | `string` | Name of the uploaded file
thubmnail | `string` | Link to the file thumbnail
type | `string` | The mimetype of the file, if available

Form Item
-----

Start implementing file uploads by adding a `File Select` item to your `form`. You can specify if multiple files should be uploaded and you can fill the uploader with the current file.

### Example single file form

```json
{
    "type": "file_select",
    "file_select": {
        "target": "example/upload.php",
        "name": "mainlogo",
        "multiple": false,
        "file": {
            "ref": 851,
            "thumbnail": "example/thumb1.jpg"
        }
    }
}
```

### Example multiple files form

```json
{
    "type": "file_select",
    "file_select": {
        "target": "example/upload.php",
        "name": "logos[]",
        "multiple": true,
        "files": [
            {
                "ref": 1,
                "name": "file.jpg",
                "thubmnail": null,
                "type": "the/mimetype"
            },
            {
                "ref": 2,
                "name": "otherfile.jpg",
                "thubmnail": null,
                "type": "the/mimetype"
            }
        ]
    }
}
```

target | `string` | The target url for the upload requests
multiple | `boolean` | Default is false, set to true to enable multiple file uploads
file | `file` | Use when multiple is `false` to fill the data of the single file
files | `array` of `file` | Use when multiple is `true` to fill the data of the files

Upload Request
------

The files are uploaded direcly after they are selected in the file browser, or dropped on the drag 'n drop area. There is one request per file.

The request that is sent to the server differs from browser to browser to ensure compatibility with Internet Explorer.

The jQuery File Upload library has some [example implementations](https://github.com/blueimp/jQuery-File-Upload/tree/master/server).

Upload Response
------

You should ensure that the upload requests responds with a `File` object below. As you can see you can also provide an error, the file uploaded will adjust the interface accordingly.

```json
{
    "type": "file",
    "file": {
        "ref": 123,
        "name": "file.jpg",
        "thubmnail": null,
        "type": "the/mimetype"
    }
}
```

```json
{
    "type": "file",
    "file": {
        "error": "You can only upload imges of type: png,jpg"
    }
}
```

Form Request
------

When the files have been uploaded the form data will contain the references to the uploaded files from the upload responses. These you can use to save file reference. An example of the single and multifileuploader responses can be found below.

```
Array
(
    [logos] => Array
        (
            [0] => 1
            [1] => 2
        )
    [mainlogo] => 851
)
```