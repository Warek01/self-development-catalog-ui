import { FC } from 'react';
import classNames from 'classnames';

import { icons } from 'components';
import style from './style.module.scss';

interface Props {
  size?: number;
}

const Loading: FC<Props> = ({ size = 24 }) => {
  return (
    <span className={classNames('flex items-center justify-center p-1', style.rotate)}>
      <icons.Loading width={size} height={size} className="fill-black" />
    </span>
  );
};

export default Loading;
