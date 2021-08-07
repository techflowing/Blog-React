import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import type { LoginParams } from '@/pages/user/Login/login-typings';
import { login } from '@/pages/user/Login/service';
import { md5String } from '@/utils/md5-util';
import { saveUserInfoToLocalStorage } from '@/utils/common-util';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (params: LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      const response = await login({
        username: params.username,
        password: md5String(params.password),
      });
      if (response.code === 0 && response.data !== undefined) {
        saveUserInfoToLocalStorage(response.data);
        if (initialState !== undefined) {
          initialState.currentUser = response.data;
          await setInitialState({ ...initialState, currentUser: response.data });
        }
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        if (!history) {
          return;
        }
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/admin');
      } else {
        message.error(`登录失败：${response.message}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.png" />
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as LoginParams);
            }}
          >
            {
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'请输入用户名'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'请输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
                />
              </>
            }
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
