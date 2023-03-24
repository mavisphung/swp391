import { Avatar, List, message, Rate } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { viewOrderDetail } from '~/system/Constants/LinkURL';

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';

const ContainerHeight = 450;

function Feedback(productId) {
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        // message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={70}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <Link
            to={`${viewOrderDetail}/166`}
            style={{ textDecoration: 'none' }}
          >
            <List.Item key={item.email}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <p style={{ paddingTop: 5 }}>
                  Sản phẩm tốt. Tôi sẽ tiếp tục ủng hộ shop ❤️
                </p>
                <div
                  style={{
                    marginTop: -10,
                    marginLeft: 'auto',
                  }}
                >
                  <span
                    style={{
                      marginRight: 10,
                      fontSize: '0.8rem',
                      color: 'rgba(0, 0, 0, 0.45)',
                    }}
                  >
                    16/03/2023 14:30
                  </span>
                  <Rate
                    allowHalf
                    value={4.5}
                    disabled={true}
                    style={{
                      fontSize: '0.8rem',
                    }}
                  />
                </div>
              </div>
            </List.Item>
          </Link>
        )}
      </VirtualList>
    </List>
  );
}

export default Feedback;
