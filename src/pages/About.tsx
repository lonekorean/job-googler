import '../styles/pages/About.css';

export default function About() {
  return (
    <>
      <title>Job Googler - About</title>

      <h1>About</h1>

      <div className="About__prose">
        <p>
          <strong>Job Googler</strong> is a simple web app to help you craft Google searches for job postings.
          Sometimes you can find "hidden" job postings this way, or at least find them before they're flooded with applications. 🙃
        </p>
        <p>
          Inputs are saved to local storage when you fire off a search, so they'll still be there the next time you visit.
          You can also just bookmark the Google search results directly.
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
