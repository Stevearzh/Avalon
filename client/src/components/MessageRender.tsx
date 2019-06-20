import Link from '@material-ui/core/Link';
import * as React from 'react';

import { URL_REGEX } from '@src/const';

interface Props {
  msg: string;
}

class MessageRender extends React.Component<Props> {
  private preDealURL = (msg: string) => {
    const splitText = msg.split(URL_REGEX);

    if (splitText.length <= 1) {
      return msg;
    }
    const matches = msg.match(URL_REGEX) || [];

    // tslint:disable:ter-indent
    return splitText // 'https://abc.example'.split(URL_REGEX) => ["", "https", ""]
      .filter(str => str !== 'http' && str !== 'https' && str !== 'ftp' && str !== 'file')
      .reduce(
        (arr, element, index) =>
          matches[index]
            ? [
                ...arr,
                element,
                <Link key={index} href={matches[index]} target="_blank">
                  {matches[index]}
                </Link>,
              ]
            : [...arr, element],
        [],
      );
    // tslint:enable:ter-indent
  }; // tslint:disable-line:semicolon

  public render() {
    const { msg } = this.props;

    return <span>{this.preDealURL(msg)}</span>;
  }
}

export default MessageRender;
