import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MSG59 } from '~/system/Messages/messages';

function NoData() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '50%',
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
        className="outline-border-shadow"
      >
        <FontAwesomeIcon
          icon={faKiwiBird}
          style={{ fontSize: '4rem', padding: '20px 0' }}
        />
        <h4>Không có dữ liệu</h4>
        <p>{MSG59}</p>
      </div>
    </div>
  );
}

export default NoData;
