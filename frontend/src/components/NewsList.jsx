import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const NewsList = ({ articles }) => {
  if (articles.length === 0) {
    return <div className="alert alert-info">Aucun article trouvé</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {articles.map(article => (
        <div key={article.url} className="col">
          <div className="card h-100">
            {article.image && (
              <img
                src={article.image}
                className="card-img-top"
                alt={article.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
              <div className="mt-auto">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Lire l'article
                </a>
              </div>
            </div>
            <div className="card-footer text-muted">
              <small>
                {format(new Date(article.publishedAt), 'dd MMMM yyyy à HH:mm', { locale: fr })} - 
                {article.source.name}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;