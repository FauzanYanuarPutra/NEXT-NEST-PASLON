import { LoaderQuarter } from 'tabler-icons-react';

function Loader() {
  return (
    <div className="fixed top-0 botom-0 left-0 right-0 w-full h-full flex justify-center items-center">
      <div className="animate-spin">
        <LoaderQuarter size={46} strokeWidth={2.5} color={'#4060bf'} />
      </div>
    </div>
  );
}

export default Loader;