import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { actionCreators as channelActionCreators, State as Channel } from '@models/channel';
import { actionCreators as dateActionCreators } from '@models/date';
import { Dispatch, RootState } from '@src/models';
import { cleanChannel } from '@src/utils';

interface Props extends RouteComponentProps<{ channel: string }> {}

interface StateProps {
  channel: Channel;
}

interface DispatchProps {
  selectChannel: typeof channelActionCreators.selectChannel;
  fetchChannelList: typeof channelActionCreators.fetchList;
  fetchAvailableDate: typeof dateActionCreators.fetchAvailableDate;
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      selectChannel: channelActionCreators.selectChannel,
      fetchChannelList: channelActionCreators.fetchList,
      fetchAvailableDate: dateActionCreators.fetchAvailableDate,
    },
    dispatch,
  );

class Home extends React.Component<Props & StateProps & DispatchProps> {
  public async componentDidMount() {
    await this.props.fetchChannelList();

    const { list } = this.props.channel;
    const urlChannel = this.props.match.params.channel;

    const position = urlChannel ? list.map((c: string): string => cleanChannel(c)).indexOf(urlChannel) : -1;

    const channel = position > -1 ? list[position] : list[0];
    this.props.selectChannel(channel);

    await this.props.fetchAvailableDate();
  }

  public render() {
    return <div>Home</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
