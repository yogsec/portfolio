// projects.js - Render projects with filtering

const projectsContainer = document.getElementById('projectsContainer');

// Function to render projects based on filter
function renderProjects(filter = 'all') {
    if (!projectsContainer) return;
    
    let filteredProjects = projectsData;
    if (filter !== 'all') {
        filteredProjects = projectsData.filter(project => project.category === filter);
    }
    
    if (filteredProjects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-folder-x fs-1 text-muted"></i>
                <h4 class="mt-3">No projects found in this category</h4>
                <p class="text-muted">Try another filter</p>
            </div>
        `;
        return;
    }
    
    projectsContainer.innerHTML = filteredProjects.map(project => `
        <div class="col-md-6 col-lg-4 project-item" data-category="${project.category}">
            <div class="project-card-detailed">
                <div class="project-header">
                    <div class="d-flex justify-content-between align-items-start">
                        <h4 class="project-name">${escapeHtml(project.name)}</h4>
                        <span class="tech-badge">${escapeHtml(project.tech)}</span>
                    </div>
                    <div class="stars-count">
                        <i class="bi bi-star-fill text-warning"></i> ${project.stars}
                    </div>
                </div>
                <p class="project-description">${escapeHtml(project.description)}</p>
                <div class="project-footer">
                    <div class="project-links">
                        <a href="${project.url}" target="_blank" class="repo-link">
                            <i class="bi bi-github"></i> GitHub
                        </a>
                        ${project.liveDemo ? `<a href="${project.liveDemo}" target="_blank" class="demo-link"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    renderProjects('all');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            // Render filtered projects
            renderProjects(filterValue);
        });
    });
});