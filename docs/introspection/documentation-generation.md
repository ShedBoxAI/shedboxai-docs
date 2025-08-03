# Introspection Output

ShedBoxAI's introspection generates LLM-optimized markdown documentation designed specifically for AI configuration assistance.

## Generated Documentation

The introspection command produces a single comprehensive markdown file containing:

### LLM-Optimized Format
- **Structured for AI consumption**: Clear sections and consistent formatting
- **Token estimation**: Helps AI understand dataset size constraints
- **Processing recommendations**: AI-generated suggestions for optimal operations
- **Sample data**: Representative examples for context understanding

### Content Sections
- **Header with metadata**: Analysis timestamp and success statistics
- **LLM processing notes**: Context window warnings and dataset insights
- **Data source analysis**: Detailed schema information and statistics
- **Relationship detection**: Automatically identified connections between sources
- **Operation recommendations**: Specific suggestions for ShedBoxAI operations

## Usage with Claude Code

The markdown output is specifically designed for use with AI assistants:

```bash
# Generate introspection report
shedboxai introspect config.yaml --include-samples -o analysis.md
```

Then paste the entire `analysis.md` content to Claude Code with requests like:
- "Create a ShedBoxAI configuration from this analysis"
- "Build a pipeline that filters and aggregates this data"
- "Generate a report configuration based on these sources"

## Output Customization

Limited customization options are available:

### Include Sample Data
```bash
shedboxai introspect config.yaml --include-samples
```
Adds representative data examples to help AI understand data structure.

### Custom Output Path
```bash
shedboxai introspect config.yaml -o custom_analysis.md
```
Saves the report to a custom location.

## Next Steps

- [Introspection Overview](./overview.md) - Getting started guide
- [Data Analyzers](./analyzers.md) - Understanding analyzer capabilities  
- [Command Reference](../cli-reference/introspect-command.md) - Complete command options