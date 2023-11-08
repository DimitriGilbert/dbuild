{{ $filename := .Get "file" }}
{{ $file := .Get "file" | readFile }}
{{ $lang := .Get "language" }}
```{{ $lang }}
{{ $file }}
```