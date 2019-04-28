import React from 'react';
import { Table, Modal } from 'antd';
import { connect } from 'dva';
import SampleChart from '../../component/SampleChart';

class List extends React.Component {
  state = {
    // ...
    statisticVisible: false,
    id: null,
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
    {
      title: '',
      dataIndex: '_',
      render: (_, { id }) => {
        return (
          <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
        );
      },
    },
  ];

  showStatistic = (id) => {
    this.props.dispatch({
      type: 'cards/getStatistic',
      payload: id,
    });
    // 更新 state，弹出包含图表的对话框
    this.setState({ id, statisticVisible: true });
  };

  handleStatisticCancel = () => {
    this.setState({
      statisticVisible: false,
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  }

  render() {
    const { /* ... */ statisticVisible, id } = this.state;
    const { cardsList, cardsLoading, statistic } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
          <SampleChart data={statistic[id]} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoding: state.loading.effects['cards/queryList'],
  };
}

export default connect(mapStateToProps)(List);
