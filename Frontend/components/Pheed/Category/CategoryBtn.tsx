import React, {Dispatch, SetStateAction} from 'react';
import Button from '../../Utils/Button';

const CategoryBtn = ({
  title,
  code,
  isactive,
  setIsActive,
}: {
  title: string;
  code: number;
  isactive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
}) => {
  return isactive === code ? (
    <Button
      title={title}
      btnSize="medium"
      textSize="medium"
      isGradient={true}
      isOutlined={false}
      onPress={() => setIsActive(code)}
    />
  ) : (
    <Button
      title={title}
      btnSize="medium"
      textSize="medium"
      isGradient={true}
      isOutlined={true}
      onPress={() => setIsActive(code)}
    />
  );
};

export default CategoryBtn;
