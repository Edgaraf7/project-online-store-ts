import { useEffect, useState } from 'react';
import { getCategories } from '../../services/api';
import { CategoryType, TreatmentProps } from '../../types';
import styles from './Categories.module.css';

export function Categories({ treatment }: TreatmentProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  async function fetchCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav className={ styles.container }>
      <button
        className={ styles.title }
        onClick={ () => setShowCategories(!showCategories) }
        onKeyDown={ (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowCategories(!showCategories);
          }
        } }
        aria-expanded={ showCategories }
        aria-controls="category-list"
      >
        Categorias
      </button>
      {showCategories && (
        <ul id="category-list" className={ styles.list }>
          {categories.map((category) => (
            <li key={ category.id } className={ styles.item }>
              <button
                className={ styles.button }
                data-testid="category"
                onClick={ () => treatment(category.id) }
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
