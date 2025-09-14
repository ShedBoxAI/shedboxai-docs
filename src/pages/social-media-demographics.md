---
title: Social Media Demographics Analytics API - Twitter Census Data Integration
description: Professional social media demographics analytics platform. Integrate Twitter API with US Census data for audience targeting, market research, and demographic analysis. Enterprise-grade data processing pipeline.
keywords: [social media demographics API, twitter census data integration, demographic analytics platform, audience targeting software, social media market research, twitter demographics analysis, census API integration, social media intelligence, demographic segmentation API, twitter audience analytics]
---

# Social Media Demographics Analysis

**Analyze social media engagement patterns across different demographic segments using ShedBoxAI's powerful data processing capabilities.**

## Overview

This configuration combines social media data with US Census demographics to provide insights into audience engagement patterns across different age groups, locations, and socioeconomic segments.

## What This Configuration Does

- **Fetches social media data** from Twitter API with engagement metrics
- **Enriches with demographic data** from US Census Bureau API  
- **Processes and correlates** engagement patterns by demographic segments
- **Generates AI insights** about optimal targeting strategies
- **Outputs actionable recommendations** for content and campaign optimization

## Sample ShedBoxAI Configuration

```yaml
# Social Media Demographics Analysis Pipeline
# Generated for ShedBoxAI v1.0

data_sources:
  # Social media engagement data
  twitter_data:
    type: rest
    url: "https://api.twitter.com/2/tweets/search/recent"
    method: GET
    headers:
      Authorization: "Bearer ${TWITTER_BEARER_TOKEN}"
    options:
      params:
        query: "${HASHTAG_OR_KEYWORD}"
        max_results: 100
        tweet.fields: "public_metrics,created_at,author_id"
        user.fields: "location,public_metrics"
    response_path: "data"
    
  # US Census demographic data
  census_demographics:
    type: rest
    url: "https://api.census.gov/data/2021/acs/acs1"
    method: GET
    options:
      params:
        get: "B01001_001E,B19013_001E,B15003_022E"  # Population, Income, Education
        for: "state:*"
        key: "${CENSUS_API_KEY}"

processing:
  # Filter for high-engagement posts
  contextual_filtering:
    high_engagement_posts:
      source: twitter_data
      conditions:
        - field: "public_metrics.like_count"
          condition: ">= 10"
        - field: "public_metrics.retweet_count"
          condition: ">= 5"
          
  # Join social and demographic data
  relationship_highlighting:
    demographic_engagement:
      primary_source: high_engagement_posts
      related_source: census_demographics
      join_configuration:
        type: "enrichment"
        join_logic: "location_based"
      derived_fields:
        - "engagement_rate = (public_metrics.like_count + public_metrics.retweet_count) / public_metrics.impression_count"
        - "demographic_segment = categorize_by_income_education(B19013_001E, B15003_022E)"
        
  # Statistical analysis of engagement patterns
  content_summarization:
    engagement_statistics:
      source: demographic_engagement
      method: statistical
      fields: ["engagement_rate", "public_metrics.like_count", "public_metrics.retweet_count"]
      summarize: ["mean", "median", "max", "count"]
      group_by: ["demographic_segment"]

# AI-powered insights generation
ai_interface:
  model:
    type: rest
    url: "https://api.openai.com/v1/chat/completions"
    method: POST
    headers:
      Authorization: "Bearer ${OPENAI_API_KEY}"
      Content-Type: "application/json"
    options:
      model: "gpt-4"
      temperature: 0.7
      
  prompts:
    demographic_insights:
      system: |
        You are a social media analytics expert specializing in demographic targeting.
        Analyze engagement patterns and provide actionable marketing recommendations.
        
      user_template: |
        # Social Media Engagement Analysis
        
        ## Engagement Statistics by Demographic Segment
        {{ engagement_statistics }}
        
        ## High-Performing Content Examples  
        {{ high_engagement_posts | slice(0, 5) }}
        
        Please provide:
        1. Key demographic segments with highest engagement rates
        2. Content themes that resonate with each segment
        3. Optimal posting strategies for each demographic
        4. Recommendations for improving engagement with underperforming segments
        5. Suggested hashtag and keyword strategies
        
        Format your response as actionable insights for a marketing team.
        
      response_format: "json"
      max_tokens: 1500

# Output configuration
output:
  type: file
  path: "social_media_demographics_analysis.json"
  format: json
```

## Setup Instructions

### 1. API Keys Required

```bash
# Add to your .env file
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
CENSUS_API_KEY=your_census_api_key  # Free from census.gov
OPENAI_API_KEY=your_openai_api_key
```

### 2. Install ShedBoxAI

```bash
pip install shedboxai
```

### 3. Run the Analysis

```bash
# Save the configuration as social-demographics.yaml
shedboxai run social-demographics.yaml

# With custom parameters
shedboxai run social-demographics.yaml --env HASHTAG_OR_KEYWORD="#yourbrand"
```

## Expected Results

The analysis will generate:

- **Demographic Engagement Report**: Engagement rates by age, income, education level
- **High-Performing Content Analysis**: Top posts with demographic breakdown  
- **AI-Generated Insights**: Strategic recommendations for each demographic segment
- **Targeting Recommendations**: Optimal audience segments for different content types

## Use Cases

- **Brand Marketing**: Optimize content for different demographic segments
- **Political Campaigns**: Understand messaging effectiveness across voter demographics  
- **Product Launches**: Identify early adopter demographics and engagement patterns
- **Content Strategy**: Develop demographic-specific content calendars
- **Ad Targeting**: Improve social media ad performance with demographic insights

## Advanced Customization

### Add Geographic Analysis

```yaml
# Add to processing section
geographic_analysis:
  source: demographic_engagement
  group_by: ["state", "demographic_segment"]
  aggregate:
    avg_engagement: "AVG(engagement_rate)"
    total_reach: "SUM(public_metrics.impression_count)"
```

### Include Sentiment Analysis

```yaml
# Add sentiment data source
sentiment_data:
  type: rest
  url: "https://api.textrazor.com/analyze"
  method: POST
  headers:
    x-textrazor-key: "${TEXTRAZOR_API_KEY}"
```

## Learning Resources

- **[ShedBoxAI Documentation](/docs/getting-started/installation)** - Complete setup guide
- **[Claude Code Integration](/claude-code-integration)** - Generate configurations with AI
- **[Operations Reference](/docs/operations/)** - All data processing operations
- **[API Configuration Guide](/docs/configuration/data-sources)** - REST API setup

---

*This example demonstrates ShedBoxAI's capability to integrate multiple data sources, perform complex data processing, and generate AI-powered insights - all through simple YAML configuration.*