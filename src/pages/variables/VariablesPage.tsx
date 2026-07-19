import styles from './VariablesPage.module.css';
import { VariableCard } from '@/components/ui/variable-card/VariableCard';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { useVariables } from '@/hooks';

export default function VariablesPage() {
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
              variant='outline'
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              1
            </Button>

            <Button
              variant='outline'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className={styles.pagInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant='outline'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>

            <Button
              variant='outline'
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {totalPages}
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
