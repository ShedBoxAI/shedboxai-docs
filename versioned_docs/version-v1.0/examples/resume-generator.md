# Resume Generator: AI-Powered Job Application Optimization

:::tip Real-World Impact
Transform hours of manual resume customization into **automated, targeted applications** for every job opportunity. Generate dozens of tailored resumes in minutes instead of hours.
:::

## The Problem: Job Search Inefficiency

**Manual Resume Customization is Painful:**
- ⏰ **2-3 hours per application** rewriting resumes for each job
- 📝 **Inconsistent targeting** - hard to optimize for specific roles
- 🎯 **Missed keywords** - ATS systems filter out generic resumes
- 😫 **Application fatigue** - only applying to a few jobs due to time constraints

**The Cost**: Most job seekers apply to only 5-10 positions instead of 50+ targeted applications.

## The Solution: AI-Powered Resume Generation

With ShedBoxAI + AI, you can:
- **Scrape job postings** from LinkedIn automatically
- **Generate tailored resumes** for each position using AI
- **Scale your job search** from 5 applications to 50+ targeted applications
- **Optimize for ATS systems** with job-specific keywords

## Complete Tutorial: From Job Posts to Tailored Resumes

### Step 1: Collect Job Postings from LinkedIn

First, we'll use a browser extension to scrape LinkedIn job posts efficiently.

#### Install Web Scraper Extension

1. **Install the extension**: [Web Scraper - Free Web Scraping](https://chromewebstore.google.com/detail/web-scraper-free-web-scra/jnhgnonknehpejjnehehllkliplmbmhn?hl=en)

2. **Import our pre-configured recipe**:
   ```json
   {
     "_id": "linkedin_jobs",
     "startUrl": ["https://www.linkedin.com/jobs/search-results/?keywords=software%20developer"],
     "selectors": [
       {
         "id": "job_click",
         "parentSelectors": ["_root"],
         "type": "SelectorElementClick",
         "clickElementSelector": "div.job-card-job-posting-card-wrapper__entity-lockup",
         "clickType": "clickOnce",
         "delay": 1000,
         "multiple": true,
         "selector": "div.jobs-semantic-search-job-details-wrapper"
       },
       {
         "id": "name",
         "parentSelectors": ["job_click"],
         "type": "SelectorText",
         "selector": "a[data-test-job-title]",
         "multiple": false
       },
       {
         "id": "description",
         "parentSelectors": ["job_click"],
         "type": "SelectorText",
         "selector": "div.jobs-box__html-content",
         "multiple": false
       }
     ]
   }
   ```

3. **Scrape job postings**:
   - Navigate to LinkedIn jobs search for your target role
   - Run the scraper to collect 20-50 job postings
   - Export results as `linkedin_jobposts.csv`

#### Sample Job Data Structure
Your CSV will contain:
```csv
web-scraper-order,web-scraper-start-url,name,description
1,https://linkedin.com/jobs/...,Software Developer - Web,"About the job... 2+ years experience... .NET, C#, JavaScript..."
2,https://linkedin.com/jobs/...,Senior Frontend Engineer,"Looking for React expert... 5+ years... TypeScript, Redux..."
```

### Step 2: Prepare Your Base Resume

Create a comprehensive base resume with all your experience:

**base_resume.txt**:
```text
Sarah Chen
Senior Software Engineer
📧 sarah.chen.dev@gmail.com | 📱 (555) 123-4567 | 🔗 linkedin.com/in/sarahchendev
San Francisco, CA

PROFESSIONAL SUMMARY
Experienced full-stack software engineer with 6 years developing scalable web applications and distributed systems. Proven track record leading technical initiatives, mentoring teams, and delivering high-performance solutions for fintech and e-commerce platforms.

TECHNICAL SKILLS
Languages: Java, Python, JavaScript, TypeScript, Go, SQL
Frameworks: Spring Boot, React, Node.js, Express, Django, Angular
Databases: PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch
Cloud/DevOps: AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes, Jenkins, Terraform

PROFESSIONAL EXPERIENCE
Senior Software Engineer | TechFlow Solutions | San Francisco, CA | Jan 2022 - Present
• Architected microservices platform processing 50M+ daily financial transactions
• Led migration from monolithic architecture to containerized services, reducing deployment time by 70%
• Built real-time fraud detection system using machine learning models, preventing $2M+ in losses
• Mentored 3 junior engineers and established code review best practices

Software Engineer II | DataPrime Inc | Austin, TX | Jun 2019 - Dec 2021
• Developed customer analytics dashboard serving 10,000+ daily active users with sub-200ms response times
• Designed ETL pipelines processing 5TB+ data daily using Apache Airflow and Python
• Built REST APIs supporting 500+ concurrent users with 99.95% uptime SLA
• Optimized database queries reducing average response time by 60%

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2014 - 2018
GPA: 3.8/4.0, Magna Cum Laude

CERTIFICATIONS
• AWS Certified Solutions Architect - Associate (2021)
• Oracle Certified Professional Java SE 11 Developer (2020)
```

### Step 3: Create ShedBoxAI Configuration

**resume_generator_config.yaml**:
```yaml
# AI-Powered Resume Generator Configuration
data_sources:
  jobs:
    type: csv
    path: linkedin_jobposts.csv
    options:
      encoding: utf-8
      delimiter: ","
  
  base_resume:
    type: text
    path: base_resume.txt

# AI interface for resume generation
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    headers:
      Authorization: Bearer ${OPENAI_API_KEY}
      Content-Type: application/json
    options:
      model: gpt-4
      temperature: 0.7

  prompts:
    resume_tailoring:
      system: |
        You are a professional resume writer with 15+ years of experience helping candidates land their dream jobs.
        
        Your task is to create a compelling, ATS-friendly resume that:
        - Highlights relevant experience for the specific job
        - Uses keywords from the job description
        - Follows modern resume best practices
        - Is formatted in clean, professional markdown
        
        Focus on quantifiable achievements and results.
      
      user_template: |
        # Job Application Details
        **Position:** {{name}}
        **Job Description:**
        {{description}}
        
        # Candidate's Base Resume
        {{base_resume}}
        
        # Task
        Create a tailored resume in markdown format that positions this candidate as the ideal fit for the {{name}} position.
        
        Rewrite and restructure to emphasize experience most relevant to this specific job:
        - Use keywords from the job description
        - Rewrite professional summary to target this specific role
        - Highlight the most relevant technical skills for this position
        - Reorder experience sections to put most relevant jobs first
        - Quantify achievements where possible
        
        Structure as:
        1. Header with contact info
        2. Professional summary (3-4 lines highlighting relevant experience for THIS job)
        3. Technical skills (prioritize skills mentioned in job description)
        4. Professional experience (reorder and rewrite to emphasize relevance)
        5. Education
        6. Certifications
        
        Make the resume compelling and specific to this job opportunity.
      
      max_tokens: 2500
      for_each: jobs      # Process each job individually
      parallel: true     # Generate all resumes simultaneously

  # Learning mode - generate prompts without API costs for testing
  prompt_storage:
    enabled: true
    directory: "generated_resumes"
    store_only: false   # Set to 'true' for testing without API calls
    file_format: "resume_{name}_{timestamp}.md"
    include_metadata: true

# Output configuration
output:
  type: file
  path: resume_generation_results.json
  format: json
```

### Step 4: Set Up Environment

```bash
# Set your OpenAI API key
export OPENAI_API_KEY="your_openai_api_key_here"

# Or create .env file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### Step 5: Generate Tailored Resumes

```bash
# Run the resume generator
shedboxai run resume_generator_config.yaml --verbose
```

**What happens:**
1. **Loads job postings** from your LinkedIn CSV
2. **Loads your base resume** as reference material
3. **For each job posting**, generates a tailored resume using AI
4. **Saves individual resumes** to `generated_resumes/` folder
5. **Creates summary report** with all results

### Step 6: Review Generated Resumes

Each generated resume will be optimized for the specific job:

**Example: Software Developer - Web Position**
```markdown
# Sarah Chen
## Senior Software Engineer - Web Applications

📧 sarah.chen.dev@gmail.com | 📱 (555) 123-4567 | 🔗 linkedin.com/in/sarahchendev
San Francisco, CA

### PROFESSIONAL SUMMARY
Experienced full-stack software engineer with 6+ years specializing in web application development and e-commerce solutions. Expert in .NET, C#, JavaScript, and modern web technologies with proven experience delivering scalable web applications and maintaining high-performance systems.

### TECHNICAL SKILLS
**Web Technologies:** .NET, MVC, C#, JavaScript, TypeScript, jQuery, Angular, React
**Databases:** SQL Server, PostgreSQL, T-SQL queries and stored procedures
**Development:** Object-oriented design, web application architecture, automated testing
**Additional:** Java, Agile methodology, RESTful APIs, microservices architecture

### PROFESSIONAL EXPERIENCE

#### Senior Software Engineer | TechFlow Solutions | Jan 2022 - Present
• **Architected web-based financial platform** processing 50M+ daily transactions using .NET and microservices
• **Led e-commerce platform migration** from monolithic to containerized services, reducing deployment time by 70%
• **Developed automated testing suites** ensuring high-quality code delivery and 99.95% uptime
• **Mentored development team** of 15 engineers on web application best practices and code reviews

#### Software Engineer II | DataPrime Inc | Jun 2019 - Dec 2021  
• **Built customer-facing web dashboard** serving 10,000+ daily users with sub-200ms response times
• **Designed RESTful APIs** supporting 500+ concurrent users with robust error handling
• **Optimized database performance** with T-SQL queries reducing response time by 60%
• **Implemented web application architecture** following object-oriented design principles

[Resume continues with education and certifications...]
```

Notice how the AI has:
- ✅ **Emphasized web development experience** (relevant to the job)
- ✅ **Used keywords from job description** (.NET, C#, JavaScript, T-SQL, object-oriented design)
- ✅ **Reordered technical skills** to prioritize job requirements
- ✅ **Rewritten experience bullets** to highlight web application work
- ✅ **Maintained quantifiable achievements** while focusing on relevance

## Learning Mode: Test Without API Costs

For testing and learning, use learning mode:

```yaml
ai_interface:
  prompt_storage:
    store_only: true    # Only generate prompts, don't call OpenAI API
```

This creates perfect prompts you can manually copy to ChatGPT or Claude to see results before spending API credits.

## Results: Scaling Your Job Search

### Before: Manual Process
- ⏰ **3 hours per resume** for customization
- 📝 **5-10 applications** (limited by time)
- 🎯 **Generic targeting** (one-size-fits-all approach)
- 💸 **Low response rate** due to poor keyword optimization

### After: AI-Powered Process  
- ⚡ **5 minutes total** for 20+ tailored resumes
- 📈 **50+ targeted applications** (scaled by automation)
- 🎯 **Perfect targeting** (AI customizes for each job)
- 💰 **Higher response rate** with ATS-optimized keywords

### Real Impact
- **20x faster** resume generation
- **10x more applications** submitted
- **Better targeting** for each position
- **Consistent quality** across all applications

## Advanced Features

### Multi-Role Targeting
Generate resumes for different role types:

```yaml
# Separate configurations for different roles
data_sources:
  frontend_jobs:
    type: csv
    path: frontend_jobs.csv
  
  backend_jobs:
    type: csv  
    path: backend_jobs.csv
  
  fullstack_jobs:
    type: csv
    path: fullstack_jobs.csv
```

### Company Research Integration
Enhance with company-specific information:

```yaml
prompts:
  company_research:
    user_template: |
      Research {{company}} and customize this resume to show alignment with their:
      - Company values and culture
      - Technology stack
      - Recent news and developments
      
      Job: {{name}}
      Description: {{description}}
      Base Resume: {{base_resume}}
```

### A/B Testing Different Approaches
Test different resume styles:

```yaml
prompts:
  traditional_style:
    system: "Create a traditional, conservative resume format..."
  
  modern_style:
    system: "Create a modern, achievement-focused resume format..."
  
  technical_focus:
    system: "Create a highly technical resume emphasizing skills..."
```

## Troubleshooting

### Common Issues

**Q: AI generates resumes that are too different from my experience**
- Adjust the system prompt to be more conservative
- Add specific instructions to maintain core experience structure
- Use `temperature: 0.3` for more consistent outputs

**Q: Some job descriptions are too short or unclear**
- Filter jobs with minimum description length
- Add manual job research for key positions
- Use multiple job posting sources

**Q: Want to customize for specific companies**
- Add company research step to the pipeline
- Create company-specific prompt variations
- Include company values and culture in prompts

## Next Steps

### Scale Your Job Search
1. **Set up automated scraping** for daily job updates
2. **Create multiple resume versions** for different role types
3. **A/B test different approaches** to optimize response rates
4. **Track application success** to refine your strategy

### Extend the System
- **Cover letter generation** using the same job data
- **Interview preparation** with job-specific questions
- **LinkedIn profile optimization** with consistent messaging
- **Application tracking** with follow-up reminders

## Related Examples

- [Customer Analysis Pipeline](/docs/claude-code-integration) - Complete ShedBoxAI + Claude Code tutorial
- [Data Processing Operations](/docs/operations/index) - Understanding all available operations

---

:::tip Professional Tip
The key to successful AI-powered job search is **quality data** and **good prompts**. Spend time crafting your base resume and job scraping strategy - the AI will amplify whatever foundation you provide!
:::

**Ready to transform your job search?** With this approach, you can apply to 10x more positions while maintaining personalized, high-quality applications for every opportunity.