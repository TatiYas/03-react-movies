import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const onSubmit = props.onSubmit;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget);
    const request = formData.get('query') as string;

    if (!request.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(request);

    console.log(request);
    event.currentTarget.reset();   }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>

        <Toaster position="top-center" />
      </div>
    </header>
  );
}

export default SearchBar;