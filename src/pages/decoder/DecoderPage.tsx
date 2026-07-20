import Input from '@/components/ui/input/Input';
import styles from './DecoderPage.module.css';
import Button from '@/components/ui/button/Button';
import { HistoryChip } from '@/components/ui/history-chip/HistoryChip';
import { useDecodeVin } from '@/hooks';

export default function DecoderPage() {
  const {
    vinInput,
    history,
    decodedData,
    isLoading,
    validationError,

    setVinInput,
    handleInputChange,
    handleSubmit,
    handleDecode,
  } = useDecodeVin();

  return (
    <>
      <title>Decoder | VIN DECODER</title>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.title}>Decode Vehicle Identification Number</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label='Enter 17-character VIN'
              placeholder='e.g. 1FTFW1CT5DFC10312'
              value={vinInput}
              onChange={handleInputChange}
              maxLength={17}
              disabled={isLoading}
              error={validationError || undefined}
            />

            <Button
              type='submit'
              disabled={isLoading || vinInput.length !== 17}
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              {isLoading ? 'Decoding...' : 'Decode VIN'}
            </Button>
          </form>

          {history.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3 className={styles.label}>Recent Searches</h3>
              <ul className={styles.historyList}>
                {history.map((v, idx) => (
                  <HistoryChip
                    key={idx}
                    vin={v}
                    onClick={() => {
                      setVinInput(v);
                      handleDecode(v);
                    }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.title}>Decoding Results</h2>
          <div className={styles.tableContainer}>
            {decodedData && decodedData.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {decodedData.map((item) => (
                    <tr key={item.VariableId}>
                      <td>
                        <strong>{item.Variable}</strong>
                      </td>
                      <td>{item.Value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                {isLoading
                  ? 'Fetching specifications from NHTSA registries...'
                  : 'Enter a valid 17-character VIN code on the left to see vehicle details.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
