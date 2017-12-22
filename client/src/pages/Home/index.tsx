import * as React from 'react';
import * as moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@src/redux';
import { actionCreators, State as Channel } from '@src/redux/channel';
import { cleanChannel } from '@src/utils';

import NavBar from '@src/components/NavBar';
import LogContent from '@src/components/LogContent';

interface Props {
  params?: {
    channel?: string;
  };
}

interface StateProps {
  channel: Channel;
  time: moment.Moment;
}

interface DispatchProps {
  fetchList: typeof actionCreators.fetchList;
  selectChannel: typeof actionCreators.selectChannel;
}

interface State {
  channel: string;
}

const mapStateToProps = (state: RootState): StateProps => ({
  channel: state.channel,
  time: state.time.choosen
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => 
  bindActionCreators(
    {
      fetchList: actionCreators.fetchList,
      selectChannel: actionCreators.selectChannel
    },
    dispatch
  );

class HomeComponent extends React.Component<Props & StateProps & DispatchProps, State> {
  state = { channel: '' };

  async componentDidMount () {
    await this.props.fetchList();

    const { list } = this.props.channel;
    const urlChannel = this.props.params
      && this.props.params.channel || undefined;    

    let position: number = -1;
    if (urlChannel) {
      position = list
        .map((c: string): string => cleanChannel(c))
        .indexOf(urlChannel);
    }    

    const channel = position > -1 ? list[position] : list[0];    
    
    this.props.selectChannel(channel);
    this.setState({ channel });
  }

  componentWillReceiveProps (nextProps: Props & StateProps) {
    if (nextProps.channel.choosen !== this.state.channel) {
      this.setState({ channel: nextProps.channel.choosen });
    }
  }

  render() {
    return (
      <div className="page home-page">
        <NavBar/>
        <LogContent
          channel={cleanChannel(this.state.channel)}
          time={this.props.time}
        />
      </div>
    );
  }
}

const WrappedHome = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

interface HomeProps extends RouteComponentProps<{}> {}

const Home = (props: HomeProps) => <WrappedHome params={props.match.params} />;

export default Home;
