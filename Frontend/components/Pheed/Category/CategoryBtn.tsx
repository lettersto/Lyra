import React, {Dispatch, SetStateAction} from 'react';
import Button from '../../Utils/Button';

const CategoryBtn = ({
  title,
  code,
  isactive,
  setIsActive,
}: {
  title: string;
  code: string;
  isactive: string;
  setIsActive: Dispatch<SetStateAction<string>>;
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
