import RangeInput from '@/components/RangeInput';
import Input from '@/components/Input';
import Heading from '@/app/(home)/_components/heading/Heading';
import styles from './page.module.scss';
import FrontBack from '@/components/FrontBack';

export default function Home() {
  return (
    <main>
      <Heading />
      <form className={styles.form}>
        <RangeInput name={'seniority-level'} label={'Seniority Level'} />
        <Input name={'technologies'} label={'Technologies'} />
        <Input name={'deadline'} label={'Deadline'} />
        <FrontBack />
        <button type={'submit'}>Generate</button>
      </form>
    </main>
  );
}
