import Heading from '@/app/(home)/_components/heading/Heading';
import Form from '@/components/form/Form';
import Projects from '@/components/projects/Projects';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <main>
      <Heading />
      <div className={styles.formProjectsContainer}>
        <Form />
        <Projects />
      </div>
    </main>
  );
}
