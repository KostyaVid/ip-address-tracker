import s from './Container.module.scss';

const Container = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
