import React from 'react';

interface HeadProps {
  title: string;
  description?: string;
}

const Head: React.FC<HeadProps> = (props) => {
  React.useEffect(() => {
    document.title = props.title + ' | Avaliação Desempenho ';
    const descriptionMeta = document.querySelector("meta[name='description']");
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', props.description || '');
    }
  }, [props]);

  return null;
};

export default Head;
