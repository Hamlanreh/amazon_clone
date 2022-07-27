import { useEffect } from 'react';

const useDocumentTitle = title => {
  useEffect(() => {
    if (title) document.title = `Amazon Clone | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
