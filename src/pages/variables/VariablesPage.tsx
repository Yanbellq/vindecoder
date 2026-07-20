import styles from './VariablesPage.module.css';
import { VariableCard } from '@/components/ui/variable-card/VariableCard';
import Input from '@/components/ui/input/Input';
import ButtonComponent from '@/components/ui/button/Button';
import { useVariables } from '@/hooks';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  matches: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled,
  matches,
}: IButtonProps) => {
  return (
    <ButtonComponent
      variant='outline'
      onClick={onClick}
      disabled={disabled}
      style={matches ? {} : { padding: '0.55rem 1rem' }}
    >
      {children}
    </ButtonComponent>
  );
};

export default function VariablesPage() {
  const matches = useMediaQuery('(min-width: 768px)');
  const {
    currentVariables,
    currentPage,
    totalPages,
    searchQuery,

    setSearchQuery,
    setCurrentPage,
    handlePrevPage,
    handleNextPage,
  } = useVariables();

  return (
    <>
      <title>Variables | VIN DECODER</title>

      <section>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Vehicle Variables Registry</h1>
          <div className={styles.searchGroup}>
            <Input
              type='text'
              placeholder='Search variables by name...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ul className={styles.listGrid}>
          {currentVariables.length > 0 ? (
            currentVariables.map((v) => (
              <VariableCard key={v.ID} variable={v} />
            ))
          ) : (
            <div className={styles.noResults}>
              No variables found matching "{searchQuery}"
            </div>
          )}
        </ul>

        {currentVariables.length > 0 && (
          <div className={styles.pagination}>
            <Button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              matches={matches}
            >
              1
            </Button>

            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              matches={matches}
            >
              <ArrowBigLeftDash size={matches ? 23 : 20} />
            </Button>

            <span className={styles.pagInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              matches={matches}
            >
              <ArrowBigRightDash size={matches ? 23 : 20} />
            </Button>

            <Button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              matches={matches}
            >
              {totalPages}
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
