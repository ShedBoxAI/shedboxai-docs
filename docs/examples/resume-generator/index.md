# Resume Generator Example

Generate tailored resumes automatically from structured data using ShedBoxAI's template matching and AI capabilities.

## Overview

This example demonstrates how to:
- Process job seeker data and job requirements
- Generate personalized resumes for multiple positions
- Use AI to optimize content for specific roles
- Create multiple output formats (PDF, HTML, Word)

## Sample Data Structure

### candidate_profile.yaml
```yaml
personal_info:
  name: "Sarah Johnson"
  email: "sarah.j@email.com"
  phone: "+1-555-0123"
  location: "San Francisco, CA"
  linkedin: "linkedin.com/in/sarahjohnson"

skills:
  technical: ["Python", "JavaScript", "React", "SQL", "AWS"]
  soft: ["Leadership", "Communication", "Problem Solving"]
  certifications: ["AWS Solutions Architect", "Scrum Master"]

experience:
  - company: "TechCorp Inc"
    position: "Senior Software Engineer"
    duration: "2020-2024"
    achievements:
      - "Led team of 5 developers on microservices migration"
      - "Reduced system latency by 40% through optimization"
      - "Mentored 3 junior developers"
  
  - company: "StartupXYZ"
    position: "Full Stack Developer"
    duration: "2018-2020"
    achievements:
      - "Built customer portal from scratch using React/Node.js"
      - "Implemented CI/CD pipeline reducing deployment time by 60%"

education:
  - degree: "B.S. Computer Science"
    school: "University of California, Berkeley"
    year: 2018
    gpa: 3.8
```

### job_requirements.json
```json
[
  {
    "job_id": "senior-dev-001",
    "company": "InnovateTech",
    "title": "Senior Software Engineer",
    "required_skills": ["Python", "AWS", "Microservices", "Leadership"],
    "preferred_skills": ["React", "DevOps", "Mentoring"],
    "experience_level": "5+ years",
    "focus_areas": ["system_architecture", "team_leadership", "performance_optimization"]
  },
  {
    "job_id": "fullstack-002", 
    "company": "WebSolutions",
    "title": "Full Stack Developer",
    "required_skills": ["JavaScript", "React", "Node.js", "SQL"],
    "preferred_skills": ["AWS", "CI/CD", "Agile"],
    "experience_level": "3+ years",
    "focus_areas": ["frontend_development", "user_experience", "rapid_development"]
  }
]
```

## Configuration

### resume-generator.yaml
```yaml
data_sources:
  candidate:
    type: yaml
    path: candidate_profile.yaml
  
  jobs:
    type: json
    path: job_requirements.json

processing:
  # Match candidate skills to job requirements
  relationships:
    skill_matching:
      primary_source: candidate
      related_source: jobs
      analysis_type: skill_overlap
      derived_fields:
        - field: skill_match_score
          expression: "calculate_skill_overlap(candidate.skills, job.required_skills)"
        - field: relevant_experience
          expression: "filter_experience_by_skills(candidate.experience, job.required_skills)"
  
  # Generate tailored content for each job
  format_conversion:
    tailored_resumes:
      source: skill_matching
      for_each: jobs  # Generate one resume per job
      operations:
        - type: field_extraction
          fields: [personal_info, education]
        - type: calculated_field
          field: relevant_skills
          expression: "intersect(candidate.skills.technical, job.required_skills)"
        - type: calculated_field
          field: highlight_achievements
          expression: "prioritize_achievements_by_keywords(candidate.experience, job.focus_areas)"

# AI-powered content optimization
ai_interface:
  prompts:
    optimize_summary:
      system: |
        You are a professional resume writer with expertise in ATS optimization.
        Create compelling professional summaries tailored to specific job requirements.
      
      user_template: |
        Job Title: {{job.title}} at {{job.company}}
        Required Skills: {{job.required_skills | join(', ')}}
        Focus Areas: {{job.focus_areas | join(', ')}}
        
        Candidate Background:
        - {{candidate.experience | summarize}}
        - Skills: {{candidate.skills.technical | join(', ')}}
        - Achievements: {{highlight_achievements | top(3) | join('; ')}}
        
        Write a 3-4 sentence professional summary that:
        1. Highlights relevant experience and skills
        2. Mentions key achievements that align with the role
        3. Uses keywords from the job requirements
        4. Shows clear value proposition
      
      max_tokens: 200
      temperature: 0.7
    
    optimize_achievements:
      system: |
        You are a resume optimization expert. Rewrite achievement bullets to be more impactful
        using action verbs, quantifiable results, and job-relevant keywords.
      
      user_template: |
        Job Focus: {{job.focus_areas | join(', ')}}
        Required Skills: {{job.required_skills | join(', ')}}
        
        Original Achievement: {{achievement}}
        
        Rewrite this achievement to be more compelling for this specific role.
        Include metrics when possible and use strong action verbs.
        Keep it to 1-2 lines maximum.
      
      for_each: highlight_achievements
      max_tokens: 100
      temperature: 0.6

# Generate multiple resume formats
template_matching:
  html_resume:
    source: tailored_resumes
    for_each: true  # One resume per job
    template: |
      <!DOCTYPE html>
      <html>
      <head>
          <title>{{personal_info.name}} - Resume</title>
          <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .section { margin: 20px 0; }
              .company { font-weight: bold; }
              .skills { display: flex; flex-wrap: wrap; gap: 10px; }
              .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>{{personal_info.name}}</h1>
              <p>{{personal_info.email}} | {{personal_info.phone}} | {{personal_info.location}}</p>
              <p>{{personal_info.linkedin}}</p>
          </div>
          
          <div class="section">
              <h2>Professional Summary</h2>
              <p>{{ai_optimized_summary}}</p>
          </div>
          
          <div class="section">
              <h2>Core Skills</h2>
              <div class="skills">
                  {% for skill in relevant_skills %}
                  <span class="skill">{{skill}}</span>
                  {% endfor %}
              </div>
          </div>
          
          <div class="section">
              <h2>Professional Experience</h2>
              {% for exp in relevant_experience %}
              <div style="margin-bottom: 20px;">
                  <div class="company">{{exp.position}} - {{exp.company}}</div>
                  <div>{{exp.duration}}</div>
                  <ul>
                      {% for achievement in exp.optimized_achievements %}
                      <li>{{achievement}}</li>
                      {% endfor %}
                  </ul>
              </div>
              {% endfor %}
          </div>
          
          <div class="section">
              <h2>Education</h2>
              {% for edu in education %}
              <div>{{edu.degree}} - {{edu.school}} ({{edu.year}})</div>
              {% endfor %}
          </div>
      </body>
      </html>
    
    output_format: html
  
  markdown_resume:
    source: tailored_resumes
    for_each: true
    template: |
      # {{personal_info.name}}
      
      **Email:** {{personal_info.email}} | **Phone:** {{personal_info.phone}}  
      **Location:** {{personal_info.location}} | **LinkedIn:** {{personal_info.linkedin}}
      
      ## Professional Summary
      
      {{ai_optimized_summary}}
      
      ## Core Skills
      
      {{relevant_skills | join(' • ')}}
      
      ## Professional Experience
      
      {% for exp in relevant_experience %}
      ### {{exp.position}} - {{exp.company}}
      *{{exp.duration}}*
      
      {% for achievement in exp.optimized_achievements %}
      - {{achievement}}
      {% endfor %}
      
      {% endfor %}
      
      ## Education
      
      {% for edu in education %}
      **{{edu.degree}}** - {{edu.school}} ({{edu.year}})
      {% endfor %}
    
    output_format: markdown

output:
  type: multiple_files
  filename_template: "resume_{{job.job_id}}_{{personal_info.name | slug}}"
  formats: [html, markdown]
```

## Usage

### Step 1: Prepare Your Data
Create your candidate profile and job requirements files:

```bash
mkdir resume-project
cd resume-project

# Create candidate_profile.yaml with your information
# Create job_requirements.json with target jobs
```

### Step 2: Run the Generator
```bash
# Generate tailored resumes
shedboxai run resume-generator.yaml

# Output files created:
# - resume_senior-dev-001_sarah_johnson.html
# - resume_senior-dev-001_sarah_johnson.md
# - resume_fullstack-002_sarah_johnson.html
# - resume_fullstack-002_sarah_johnson.md
```

### Step 3: Review and Customize
Each generated resume will be optimized for the specific job:
- Skills section shows only relevant skills
- Experience highlights job-relevant achievements
- Professional summary targets the specific role
- AI-optimized content for maximum impact

## Advanced Features

### Batch Processing Multiple Candidates
```yaml
data_sources:
  candidates:
    type: csv
    path: candidate_database.csv
  
  jobs:
    type: json
    path: job_postings.json

processing:
  format_conversion:
    candidate_job_matrix:
      source: candidates
      for_each: candidates
      cross_join: jobs  # Generate resume for each candidate-job combination
```

### ATS Optimization
```yaml
ai_interface:
  prompts:
    ats_optimization:
      system: |
        Optimize resume content for Applicant Tracking Systems (ATS).
        Ensure keyword density and format compatibility.
      
      user_template: |
        Job Description Keywords: {{job.description | extract_keywords}}
        Current Resume Section: {{resume_section}}
        
        Optimize this section for ATS while maintaining readability.
        Include relevant keywords naturally and use standard formatting.
```

### Skills Gap Analysis
```yaml
processing:
  content_summarization:
    gap_analysis:
      operations:
        - type: ai_summary
          template: |
            Candidate Skills: {{candidate.skills.technical | join(', ')}}
            Job Requirements: {{job.required_skills | join(', ')}}
            
            Analyze skill gaps and suggest improvement areas.
            Provide specific learning recommendations.
```

## Best Practices

### Data Preparation
- **Use structured formats** (YAML/JSON) for consistent processing
- **Normalize skill names** across all data sources
- **Include quantifiable achievements** with specific metrics
- **Maintain consistent date formats** and company names

### Content Optimization
- **Tailor each resume** to specific job requirements
- **Use action verbs** and quantifiable results
- **Include relevant keywords** naturally in content
- **Prioritize recent and relevant experience**

### Template Design
- **Keep formatting simple** for ATS compatibility
- **Use standard section headers** (Experience, Education, Skills)
- **Ensure clean HTML/CSS** for web-based formats
- **Test with different screen sizes** for responsive design

## Troubleshooting

### Common Issues

**Skill matching not working properly:**
```yaml
# Ensure skill names are normalized
format_conversion:
  normalize_skills:
    operations:
      - type: field_mapping
        mappings:
          "JavaScript": "javascript"
          "JS": "javascript"
          "React.js": "react"
```

**AI optimization too generic:**
```yaml
# Provide more specific context
ai_interface:
  prompts:
    optimize_summary:
      user_template: |
        Company Culture: {{job.company_culture}}
        Specific Technologies: {{job.tech_stack}}
        Team Size: {{job.team_size}}
        # Include more job-specific details
```

**Output formatting issues:**
- Use consistent template syntax
- Test templates with sample data first
- Validate HTML/CSS for web formats
- Check file permissions for output directory

## Related Examples

- [Template Matching Guide](/docs/operations/templates.md) - Advanced template techniques
- [AI Interface Configuration](/docs/configuration/ai-interface.md) - AI optimization setup
- [Format Conversion](/docs/operations/format-conversion.md) - Data transformation patterns