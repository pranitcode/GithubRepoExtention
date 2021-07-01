document.addEventListener('DOMContentLoaded', async () => {
    const linksList = document.getElementById('linksList');
    const url = 'https://github-lambda-api.netlify.app/.netlify/functions/getusers';

    const copy = (e) => {
        const str = e.target.dataset.url;
        navigator.clipboard.writeText(str);
        
    };
    
    try {
        const res = await fetch(url);
        const forRepo = await res.json();
        const RepoHtml = forRepo
            .map((repo) => {
           
                const RepoUrl = `https://github.com/pranitcode/${repo.name}`;

                return `<li class="repo-link">
                        <button class="btn" data-url="${RepoUrl}">Copy URL</button>
                        <a class="btn" href="${RepoUrl}" rel="noopener noreferrer" target="_blank">Watch</a>
                     ${repo.name}
                    </li>`;
            })
            .join('');
        
     //.............................................   
        
        linksList.innerHTML = RepoHtml;
        const repoLinks = [...document.querySelectorAll('.repo-link')];
        repoLinks.forEach((link) => link.addEventListener('click', copy));
    } catch (err) {
        console.error(err);
    }
});
