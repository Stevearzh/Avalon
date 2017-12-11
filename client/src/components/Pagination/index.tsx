import * as React from 'react';

import Button from 'material-ui/Button';
import FirstPage from 'material-ui-icons/FirstPage';
import LastPage from 'material-ui-icons/LastPage';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';

import './pagination.scss';

const DEFAULT_DISPLAY: number = 7;

interface PageClick {
  (event: React.MouseEvent<HTMLElement>): void;
}

interface PageProps {
  value: number;
  isActive: boolean;
  onClick: PageClick;
}

const Page = (props: PageProps): JSX.Element => (
  <Button
    color={props.isActive ? 'primary' : undefined}    
    onClick={props.onClick}
    dense={true}
  >
    {props.value}
  </Button>
);

interface NavProps {
  onClick: PageClick;
  disabled: boolean;
}

const FirstPageLink = (props: NavProps): JSX.Element => (
  <Button
    onClick={props.onClick}
    disabled={props.disabled}
    dense={true}
  >
    <FirstPage/>
  </Button>
);

const LastPageLink = (props: NavProps): JSX.Element => (
  <Button
    onClick={props.onClick}    
    disabled={props.disabled}
    dense={true}
  >
    <LastPage/>
  </Button>
);

const PrevPageLink = (props: NavProps): JSX.Element => (
  <Button
    onClick={props.onClick}    
    disabled={props.disabled}
    dense={true}
  >
    <ChevronLeft/>
  </Button>
);

const NextPageLink = (props: NavProps): JSX.Element => (
  <Button
    onClick={props.onClick}    
    disabled={props.disabled}
    dense={true}
  >
    <ChevronRight/>
  </Button>
);

type PageArgs = {
  total: number;
  current: number;
  display: number;
};

type PageParams = {
  start: number;
  end: number;
};

const calculateRange = (arg: PageArgs): PageParams => {
  const { total, current, display } = arg;
  let end = total;
  let start = 1;
  if (display < end) {
    // rounded to the nearest integer smaller
    let beforeNumber = Math.round(display / 2 - 0.5);
    const afterNumber = beforeNumber;
    if (display % 2 === 0) {
      beforeNumber -= 1;
    }

    if (current <= beforeNumber + 1) {
      end = display;
    } else if (current >= (total - afterNumber)) {
      start = total - display + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }

  return { end, start };
};

const correctArgs = (props: PaginationProps): PageArgs => {  
  let total = props.total;
  let current = props.current;
  let display = props.display || DEFAULT_DISPLAY;

  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  display = display > 0 ? display : 1;
  current = current < total ? current : total;
  display = display < total ? display : total;
  return { current, display, total };
};

interface PageChangeHandler {
  (page: number): void;
}

interface PaginationProps {
  total: number;
  current: number;
  onChange: PageChangeHandler;
  display?: number;
}

interface PaginationState {
  total: number;
  current: number;
  display: number;
  start: number;
  end: number;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor (props: PaginationProps) {
    super(props);
    const args = correctArgs(props);
    this.state = { ...args, ...calculateRange(args) };
  }

  componentWillReceiveProps (nextProps: PaginationProps) {
    const args = correctArgs(nextProps);
    this.setState({ ...args, ...calculateRange(args) });
  }

  setCurrent = async (current: number) => {
    const args = { ...this.state, current };
    await this.props.onChange(current);
    await this.setState({ ...args, ...calculateRange(args) });
  }

  render () {
    const { start, end, current, total } = this.state;
    const arr: number[] = [];

    for (let i: number = start; i <= end; ++i) {
      arr.push(i);
    }

    return (
      <div className="material-pagination">
        <FirstPageLink
          onClick={() => this.setCurrent(1)}
          disabled={!(current > 1)}
        />
        <PrevPageLink
          onClick={() => this.setCurrent(current - 1)}
          disabled={!(current > 1)}
        />
        {
          arr.map((page: number, i: number): JSX.Element => (
            <Page
              key={i}
              value={page}
              isActive={current === page}
              onClick={() => this.setCurrent(page)}
            />
          ))
        }
        <NextPageLink
          onClick={() => this.setCurrent(current + 1)}
          disabled={!(current < total)}
        />
        <LastPageLink
          onClick={() => this.setCurrent(total)}
          disabled={!(current < total)}
        />
      </div>
    );
  }
}

export default Pagination;
