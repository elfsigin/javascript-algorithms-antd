/*
 * @Author: yunlu.lai1@dbappsecurity.com.cn 2714838232@qq.com
 * @Date: 2025-11-08 16:29:01
 * @LastEditors: yunlu.lai1@dbappsecurity.com.cn 2714838232@qq.com
 * @LastEditTime: 2025-11-08 16:40:51
 * @FilePath: \admin-web\my-admin\src\pages\Array\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        11
      </div>
    </PageContainer>
  );
};

export default HomePage;
