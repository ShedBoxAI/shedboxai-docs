# Performance Optimization

Comprehensive guide to optimizing ShedBoxAI performance for large datasets, complex processing pipelines, and resource-constrained environments.

## Quick Performance Checklist

### Immediate Optimizations
1. **Filter early**: Apply contextual filtering before other operations
2. **Use appropriate batch sizes**: Start with 1000-5000 records
3. **Enable parallel processing**: Set `parallel: true` where supported
4. **Sample large datasets**: Use `--sample` for development and testing
5. **Monitor memory usage**: Watch for memory leaks and spikes

## Performance Profiling

### Built-in Profiling Tools

```bash
# Basic performance monitoring
shedboxai run config.yaml --profile

# Detailed timing information
shedboxai run config.yaml --timing --verbose

# Memory usage monitoring
shedboxai run config.yaml --monitor-memory

# Combined profiling
shedboxai run config.yaml --profile --timing --monitor-memory
```

### Understanding Profile Output

```
Performance Profile:
┌─────────────────────────┬──────────┬──────────┬─────────────┬──────────────┐
│ Operation               │ Duration │ Memory   │ Records     │ Records/sec  │
├─────────────────────────┼──────────┼──────────┼─────────────┼──────────────┤
│ Data Loading            │ 1.2s     │ 45MB     │ 10,000      │ 8,333        │
│ Contextual Filtering    │ 0.3s     │ 12MB     │ 5,000       │ 16,667       │
│ Format Conversion       │ 0.8s     │ 18MB     │ 5,000       │ 6,250        │
│ AI Processing           │ 15.2s    │ 8MB      │ 50 prompts  │ 3.3          │
│ Output Generation       │ 0.1s     │ 2MB      │ 5,000       │ 50,000       │
└─────────────────────────┴──────────┴──────────┴─────────────┴──────────────┘

Total: 17.6s, Peak Memory: 83MB
```

## Data Loading Optimization

### Large File Handling

#### Streaming Mode
Process files without loading entirely into memory:

```yaml
data_sources:
  large_dataset:
    type: csv
    path: huge_file.csv
    options:
      streaming: true        # Enable streaming
      chunk_size: 5000      # Records per chunk
      encoding: utf-8
```

**When to Use Streaming**:
- Files > 100MB
- Memory-constrained environments
- ETL pipelines with continuous data flow

#### Sampling for Development

```bash
# Test with sample data
shedboxai run config.yaml --sample 1000

# Random sampling
shedboxai run config.yaml --sample 5000 --sample-method random

# Systematic sampling (every Nth record)
shedboxai run config.yaml --sample 1000 --sample-method systematic
```

### Parallel Data Loading

```yaml
data_sources:
  performance_config:
    loading:
      parallel: true
      max_workers: 4         # Number of parallel threads
      prefetch_batches: 2    # Pre-load next batches
```

### File Format Optimization

**Performance Ranking** (fastest to slowest):
1. **Parquet** - Columnar, compressed, fastest
2. **CSV** - Simple, widely supported
3. **JSON** - Structured but slower parsing
4. **YAML** - Human-readable but slowest

```yaml
# Convert to faster formats when possible
data_sources:
  optimized:
    type: parquet          # Fastest option
    path: data.parquet
    
  fallback:
    type: csv
    path: data.csv
    options:
      # CSV optimization
      engine: c            # Use C parser (faster)
      low_memory: false    # Read all at once (faster but more memory)
```

## Processing Optimization

### Operation Ordering

**Optimal Processing Order**:
1. **Contextual Filtering** - Reduce dataset size early
2. **Data Cleaning** - Fix issues in smaller dataset  
3. **Relationships** - Join only necessary data
4. **Format Conversion** - Transform final dataset
5. **AI Processing** - Process minimal, clean data

```yaml
processing:
  # ✅ Optimal: Filter first (reduces 10,000 → 1,000 records)
  contextual_filtering:
    active_users:
      source: users
      conditions:
        - field: status
          condition: "status == 'active'"
  
  # Then process smaller dataset
  format_conversion:
    user_segments:
      source: active_users  # Only 1,000 records now
      operations:
        - type: calculated_field
          field: tier
          expression: "total_spent > 1000 ? 'premium' : 'standard'"
```

### Batch Processing Configuration

```yaml
processing:
  performance:
    # Optimize batch sizes by data type
    batch_sizes:
      csv: 5000              # Larger batches for simple data
      json: 1000             # Smaller for complex structures
      api: 100               # Very small for external APIs
    
    # Memory management
    memory_optimization:
      max_memory_per_batch: "500MB"
      cleanup_intermediate: true
      garbage_collect_frequency: 10  # Every 10 batches
```

### Parallel Processing

```yaml
processing:
  parallel_config:
    # Enable parallel processing
    parallel: true
    max_workers: 4           # Number of CPU cores - 1
    
    # Operations that support parallelization
    contextual_filtering:
      parallel: true
    
    format_conversion:
      parallel: true
      
    # AI processing (be careful with rate limits)
    ai_interface:
      parallel: false        # Avoid rate limiting
      batch_processing: true # Use batching instead
```

## Memory Optimization

### Memory-Efficient Configuration

```yaml
processing:
  memory_optimization:
    # Process in chunks
    streaming: true
    chunk_size: 2000
    
    # Clear intermediate results
    cleanup_intermediate: true
    
    # Use disk for overflow
    disk_spill:
      enabled: true
      directory: "/tmp/shedboxai_spill"
      threshold: "1GB"       # Spill when memory exceeds 1GB
    
    # Limit concurrent operations
    max_concurrent_operations: 2
```

### Memory Monitoring

```bash
# Monitor memory usage in real-time
shedboxai run config.yaml --monitor-memory --verbose

# Set memory limits
shedboxai run config.yaml --max-memory 2GB

# Profile memory allocation
shedboxai run config.yaml --memory-profile > memory_report.txt
```

### Large Dataset Strategies

#### Progressive Processing
```yaml
processing:
  progressive:
    # Process incrementally
    incremental: true
    checkpoint_frequency: 1000   # Save progress every 1000 records
    checkpoint_directory: "./checkpoints"
    
    # Resume from checkpoint
    resume_from_checkpoint: true
```

#### Data Partitioning
```yaml
processing:
  partitioning:
    # Partition by date
    partition_by: date_column
    partition_size: "1 month"
    
    # Process partitions independently
    partition_parallel: true
    merge_results: true
```

## AI Processing Optimization

### Rate Limiting and Batching

```yaml
ai_interface:
  rate_limiting:
    # Respect API limits
    requests_per_minute: 60      # OpenAI standard limit
    requests_per_day: 10000      # Daily quota
    
    # Backoff strategy
    retry_attempts: 3
    backoff_factor: 2            # 1s, 2s, 4s delays
    jitter: true                 # Add randomness
  
  batch_processing:
    # Batch multiple prompts
    enabled: true
    batch_size: 10              # Prompts per batch
    max_batch_tokens: 8000      # Token limit per batch
```

### Prompt Optimization

```yaml
ai_interface:
  prompts:
    optimized_analysis:
      # Minimize token usage
      system: "Analyze data efficiently. Be concise."
      
      user_template: |
        Data summary: {{data | summarize(500)}}  # Limit data size
        Provide 3-bullet analysis.               # Limit response length
      
      # Response controls
      max_tokens: 150            # Limit response length
      temperature: 0.1           # Reduce creativity for consistency
      
      # Caching
      cache_responses: true      # Cache identical prompts
      cache_ttl: 3600           # 1 hour cache
```

### Parallel AI Processing

```yaml
ai_interface:
  parallel_processing:
    # Use multiple API keys for higher throughput
    api_keys:
      - ${OPENAI_KEY_1}
      - ${OPENAI_KEY_2}
      - ${OPENAI_KEY_3}
    
    # Load balancing
    load_balancing: round_robin
    
    # Parallel requests (respect rate limits)
    max_concurrent: 3
```

## Network Optimization

### Connection Pooling

```yaml
data_sources:
  api_source:
    type: rest_api
    url: https://api.example.com/data
    options:
      # Connection optimization
      connection_pool_size: 10
      max_retries: 3
      timeout: 30
      keep_alive: true
      
      # Compression
      accept_encoding: gzip
```

### Caching Strategies

```yaml
processing:
  caching:
    # Cache API responses
    api_cache:
      enabled: true
      strategy: lru
      max_size: 1000
      ttl: 3600                # 1 hour
      
    # Cache processed results
    result_cache:
      enabled: true
      persist_to_disk: true
      cache_directory: "./cache"
```

## Storage and I/O Optimization

### Output Optimization

```yaml
output:
  # Choose efficient formats
  type: file
  format: parquet             # Fastest for large datasets
  # format: json             # Use for compatibility
  
  # Compression
  compression:
    enabled: true
    algorithm: gzip           # Good balance of speed/compression
    level: 6                  # Medium compression
  
  # Streaming output
  streaming: true
  buffer_size: 8192
```

### Temporary File Management

```yaml
processing:
  temp_files:
    # Use fast storage for temp files
    directory: "/dev/shm"      # RAM disk (Linux)
    # directory: "D:/temp"     # Fast SSD (Windows)
    
    # Cleanup strategy
    auto_cleanup: true
    max_age: 24h              # Clean files older than 24 hours
```

## Hardware Considerations

### CPU Optimization

```bash
# Check CPU cores
nproc

# Optimize for your hardware
shedboxai run config.yaml --max-workers $(nproc)

# CPU-intensive operations
shedboxai run config.yaml --cpu-intensive --max-workers 2
```

### Memory Guidelines

**Memory Requirements by Dataset Size**:
- **< 10MB**: 256MB RAM minimum
- **10-100MB**: 1GB RAM recommended  
- **100MB-1GB**: 4GB RAM recommended
- **> 1GB**: 8GB+ RAM, use streaming mode

### Storage Considerations

**Storage Type Performance**:
1. **NVMe SSD** - Best performance
2. **SATA SSD** - Good performance  
3. **HDD** - Use streaming mode
4. **Network Storage** - Cache locally when possible

## Environment-Specific Optimizations

### Docker/Container Environments

```yaml
# docker-compose.yml
services:
  shedboxai:
    image: shedboxai:latest
    environment:
      - SHEDBOXAI_MAX_MEMORY=2GB
      - SHEDBOXAI_WORKERS=2
    volumes:
      - /dev/shm:/tmp        # Use shared memory for temp files
    mem_limit: 4g            # Container memory limit
```

### Cloud Environments

#### AWS EC2
```bash
# Instance recommendations
# Small datasets: t3.medium (2 vCPU, 4GB RAM)
# Medium datasets: m5.large (2 vCPU, 8GB RAM)  
# Large datasets: m5.xlarge (4 vCPU, 16GB RAM)

# Use local NVMe storage
shedboxai run config.yaml --temp-dir /nvme/tmp
```

#### Google Cloud Platform
```bash
# Use high-memory instances for large datasets
# n1-highmem-2 (2 vCPU, 13GB RAM)
# n1-highmem-4 (4 vCPU, 26GB RAM)
```

### Serverless Environments

```yaml
# Lambda/Cloud Functions optimization
processing:
  serverless_mode:
    enabled: true
    timeout: 900             # 15 minutes max
    memory_limit: 3008       # MB
    
    # Process in smaller chunks
    chunk_size: 500
    
    # Minimize cold starts
    keep_warm: true
```

## Performance Testing

### Benchmarking

```bash
# Benchmark different configurations
shedboxai benchmark --config config1.yaml --config config2.yaml

# Test with different dataset sizes
shedboxai benchmark --sizes 1000,5000,10000,50000

# Performance regression testing
shedboxai test-performance --baseline baseline_results.json
```

### Load Testing

```bash
# Simulate high load
shedboxai load-test --concurrent 10 --duration 60s

# Memory stress test
shedboxai stress-test --memory --target-memory 2GB

# API rate limit testing
shedboxai rate-test --api openai --duration 10m
```

## Monitoring and Alerting

### Built-in Monitoring

```yaml
monitoring:
  metrics:
    enabled: true
    export_format: prometheus
    export_interval: 30s
    
  alerts:
    memory_threshold: 80%
    processing_time_threshold: 300s
    error_rate_threshold: 5%
```

### External Monitoring

```bash
# Export metrics to monitoring systems
shedboxai run config.yaml --metrics-export statsd://localhost:8125
shedboxai run config.yaml --metrics-export prometheus://localhost:9090
```

## Performance Troubleshooting

### Common Performance Issues

#### Slow Data Loading
```bash
# Diagnose loading issues
shedboxai run config.yaml --debug-loading --timing

# Common causes:
# 1. Network latency (API sources)
# 2. Large file parsing
# 3. Encoding detection overhead
```

#### Memory Leaks
```bash
# Monitor memory usage over time
shedboxai run config.yaml --monitor-memory --log-memory-stats

# Signs of memory leaks:
# - Steadily increasing memory usage
# - Out of memory errors on long runs
# - Decreased performance over time
```

#### CPU Bottlenecks
```bash
# Profile CPU usage
shedboxai run config.yaml --cpu-profile

# Identify bottlenecks:
# - High CPU during specific operations
# - Poor parallel processing scaling
# - Inefficient algorithms
```

## Best Practices Summary

### Development Phase
1. **Start small**: Test with sample data (1000 records)
2. **Profile early**: Use `--profile` to identify bottlenecks
3. **Iterate configuration**: Optimize one operation at a time
4. **Monitor resources**: Watch memory and CPU usage

### Production Phase
1. **Use streaming**: For datasets > 100MB
2. **Enable caching**: Cache API responses and intermediate results
3. **Parallel processing**: Utilize multiple CPU cores
4. **Monitor performance**: Set up alerts for degradation

### Scaling Guidelines
- **10K records**: Default configuration should work
- **100K records**: Enable parallel processing, increase batch sizes
- **1M+ records**: Use streaming, partitioning, and caching
- **10M+ records**: Consider distributed processing solutions

## Related Documentation

- [Debugging Guide](./debugging.md) - Troubleshooting errors and issues
- [Configuration Reference](/docs/configuration/overview.md) - Detailed configuration options
- [Advanced Operations](/docs/operations/advanced-operations.md) - Complex processing patterns