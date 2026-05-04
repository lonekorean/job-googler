import '../styles/pages/About.css';

export default function About() {
  return (
    <>
      <title>Job Googler - About</title>

      <h1>About</h1>

      <div className="About__prose">
        <p>
          <strong>Job Googler</strong> is just a simple web app to help you craft Google searches for job postings.
          Sometimes you can find "hidden" job postings this way, or at least find them before they're flooded with applications. 🙃
        </p>
        <p>
          Also, I wanted a little project to practice React and TypeScript with, so here we are. The source code is available on GitHub: <a href="https://github.com/lonekorean/job-googler" target="_blank">github.com/lonekorean/job-googler</a>.
        </p>
        <p>
          Remember, you can bookmark these Google searches! Then you can revisit them every so often to see what new job postings are out there.
        </p>
        <p>
          Feel free to check out my other stuff at <a href="https://codersblock.com/" target="_blank">Coder's Block</a>.
        </p>
        <p>
          ❤️ Will
        </p>
      </div>
    </>
  );
}
