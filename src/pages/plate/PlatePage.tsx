import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { HistoryChip } from '@/components/ui/history-chip/HistoryChip';
import { usePlateDecode } from '@/hooks';
import { Globe } from 'lucide-react';
import styles from './PlatePage.module.css';
import { HOTLINE_API_URL } from '@/constants';

export default function PlatePage() {
  const {
    plateInput,
    country,
    history,
    vehicleData,
    isLoading,
    validationError,

    setPlateInput,
    setCountry,
    handleInputChange,
    handleDecode,
    handleSubmit,
  } = usePlateDecode();

  return (
    <>
      <title>Plate Lookup | VEHICLE INTELLIGENCE</title>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.title}>International Plate Lookup</h2>
          <p className={styles.description}>
            Enter the vehicle registration number and select the originating
            country region.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.selectGroup}>
                <label className={styles.label}>Select Country Region</label>
                <div className={styles.selectWrapper}>
                  <Globe size={16} className={styles.selectIcon} />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={styles.select}
                    disabled={isLoading}
                  >
                    <option value='UA'>Ukraine (UA)</option>
                    <option value='PL'>Poland (PL)</option>
                    <option value='DE'>Germany (DE)</option>
                    <option value='UK'>United Kingdom (UK)</option>
                  </select>
                </div>
              </div>

              <Input
                label='Registration Number'
                placeholder='e.g. BX6724ET or WI777AX'
                value={plateInput}
                onChange={handleInputChange}
                maxLength={10}
                disabled={isLoading}
                error={validationError || undefined}
              />
            </div>

            <Button
              type='submit'
              disabled={isLoading || plateInput.length < 3}
              style={{ marginTop: '1.5rem', width: '100%' }}
            >
              {isLoading ? 'Searching Registry...' : 'Search Vehicle'}
            </Button>
          </form>

          {history.length > 0 && (
            <div style={{ marginTop: '1.75rem' }}>
              <h3 className={styles.label}>Recent Plate Searches</h3>
              <ul className={styles.historyList}>
                {history.map((plate, idx) => (
                  <HistoryChip
                    key={idx}
                    vin={plate}
                    onClick={() => {
                      setPlateInput(plate);
                      handleDecode(plate, country);
                    }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.title}>Vehicle Registry Specifications</h2>
          <div className={styles.tableContainer}>
            {vehicleData ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Licence Plate</strong>
                    </td>
                    <td>
                      <span className={styles.brandBadge}>
                        {vehicleData.number}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Manufactuurer</strong>
                    </td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={HOTLINE_API_URL + vehicleData.logo}
                          alt='Manufacturer logo'
                          style={{ width: '20px', height: '20px' }}
                        />
                      </span>{' '}
                      {vehicleData.maker}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Model</strong>
                    </td>
                    <td>
                      {vehicleData.model} | {vehicleData.categoryType}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Year</strong>
                    </td>
                    <td>{vehicleData.yearIssued}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VIN</strong>
                    </td>
                    <td>{vehicleData.bodyNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Color</strong>
                    </td>
                    <td>{vehicleData.color}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Body Type</strong>
                    </td>
                    <td>{vehicleData.bodyType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Own Weight</strong>
                    </td>
                    <td>{vehicleData.ownWeight}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Weight</strong>
                    </td>
                    <td>{vehicleData.totalWeight}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fuel Type</strong>
                    </td>
                    <td>{vehicleData.fuelType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Engine Capacity</strong>
                    </td>
                    <td>{vehicleData.capacity}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Registration Date</strong>
                    </td>
                    <td>{vehicleData.registrationDate}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                {isLoading
                  ? 'Querying international automotive databases...'
                  : 'Enter a vehicle plate number on the left to pull hardware metadata.'}
              </div>
            )}
          </div>

          {vehicleData && (
            <>
              <h2 style={{ marginTop: '2rem' }}>Person Info</h2>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Person Type</strong>
                      </td>
                      <td>{vehicleData.personInfo.personType}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Registration Place</strong>
                      </td>
                      <td>{vehicleData.personInfo.registrationPlace}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Registration Place Id</strong>
                      </td>
                      <td>{vehicleData.personInfo.registrationPlaceId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {vehicleData && (
            <>
              <h2 style={{ marginTop: '2rem' }}>Last Record Info</h2>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Operation Name</strong>
                      </td>
                      <td>{vehicleData.lastRecordInfo.operationName}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Department Name</strong>
                      </td>
                      <td>{vehicleData.lastRecordInfo.departmentName}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>State number</strong>
                      </td>
                      <td>
                        <span className={styles.brandBadge}>
                          {vehicleData.lastRecordInfo.stateNumber}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Record Date</strong>
                      </td>
                      <td>{vehicleData.lastRecordInfo.recordDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
