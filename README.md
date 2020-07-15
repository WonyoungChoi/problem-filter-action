# Github Action: Problem Filter

Filter out warning or error messages output to stdout using specific conditions.

## Workflow Config Example
```yaml
  - uses: TizenAPI/problem-filter-action@1.0
    with:
      shell: dotnet build
      type: dotnet
      files: ["src/Foo.cs", "src/Bar.cs"]
```

## Inputs
  - shell: shell command to execute
  - type: problem matcher type ('dotnet', 'python', 'node')
  - files: JSON array of files to print

