// src/pages/Stack/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Space, 
  Tag, 
  message, 
  InputNumber,
  Row,
  Col,
  Statistic,
  Popconfirm,
  List,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import Stack from './model/Stack';

const StackPage: React.FC = () => {
  const [pushForm] = Form.useForm();
  const stackRef = useRef(new Stack());
  const [stackItems, setStackItems] = useState<number[]>([]);
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [topItem, setTopItem] = useState<number | null>(null);

  // 初始化示例数据
  useEffect(() => {
    stackRef.current.push(10);
    stackRef.current.push(20);
    stackRef.current.push(30);
    updateDisplay();
    addOperationHistory('初始化栈: [10, 20, 30]');
  }, []);

  // 更新显示
  const updateDisplay = () => {
    setStackItems(stackRef.current.toArray());
    setTopItem(stackRef.current.peek());
  };

  // 添加操作历史
  const addOperationHistory = (operation: string) => {
    setOperationHistory(prev => [operation, ...prev.slice(0, 9)]);
  };

  // 入栈操作
  const handlePush = (values: any) => {
    try {
      const { value } = values;
      stackRef.current.push(Number(value));
      updateDisplay();
      addOperationHistory(`入栈(Push): ${value}`);
      message.success(`元素 ${value} 已入栈`);
      pushForm.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 出栈操作
  const handlePop = () => {
    const poppedValue = stackRef.current.pop();
    if (poppedValue !== null) {
      updateDisplay();
      addOperationHistory(`出栈(Pop): ${poppedValue}`);
      message.success(`元素 ${poppedValue} 已出栈`);
    } else {
      message.warning('栈为空，无法执行出栈操作');
    }
  };

  // 查看栈顶元素
  const handlePeek = () => {
    const top = stackRef.current.peek();
    if (top !== null) {
      addOperationHistory(`查看栈顶(Peek): ${top}`);
      message.info(`栈顶元素: ${top}`);
    } else {
      message.warning('栈为空');
    }
  };

  // 清空栈
  const handleClear = () => {
    stackRef.current.clear();
    updateDisplay();
    addOperationHistory('清空栈');
    message.success('栈已清空');
  };

  // 重置栈
  const handleReset = () => {
    stackRef.current.clear();
    stackRef.current.push(10);
    stackRef.current.push(20);
    stackRef.current.push(30);
    updateDisplay();
    addOperationHistory('重置栈为初始状态');
    message.success('栈已重置');
  };

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        {/* 左侧操作面板 */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {/* 统计信息 */}
            <Card>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic 
                    title="栈大小" 
                    value={stackItems.length}
                    suffix={`/ ∞`}
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title="栈顶元素" 
                    value={topItem !== null ? topItem : '空'}
                    valueStyle={{ 
                      color: topItem !== null ? '#3f8600' : '#cf1322' 
                    }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title="栈状态" 
                    value={stackRef.current.isEmpty() ? '空' : '非空'}
                  />
                </Col>
              </Row>
            </Card>
              {/* 栈的可视化 */}
            <Card title={`栈可视化 (LIFO - 后进先出)`} bordered={false}>
              {stackItems.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: 60, 
                  color: '#999',
                  border: '2px dashed #d9d9d9',
                  borderRadius: 8
                }}>
                  <div>栈为空</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>请执行入栈操作添加元素</div>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 400,
                  position: 'relative'
                }}>
                  {/* 栈顶指示器 */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 20,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 12, color: '#666' }}>栈顶</div>
                    <ArrowUpOutlined style={{ fontSize: 16, color: '#52c41a' }} />
                  </div>

                  {/* 栈容器 */}
                  <div style={{ 
                    width: 200,
                    border: '2px solid #1890ff',
                    borderTop: 'none',
                    borderBottom: 'none',
                    position: 'relative',
                    minHeight: 300
                  }}>
                    {/* 栈元素 */}
                    {stackItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          border: '2px solid #1890ff',
                          borderBottom: index === stackItems.length - 1 ? '2px solid #1890ff' : 'none',
                          background: index === 0 
                            ? 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)' 
                            : 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
                          color: 'white',
                          padding: '16px 0',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 18,
                          margin: '0 -2px',
                          position: 'relative',
                          zIndex: stackItems.length - index,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {item}
                        {index === 0 && (
                          <div style={{ 
                            fontSize: 12, 
                            opacity: 0.9,
                            marginTop: 4
                          }}>
                            (栈顶)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 栈底指示器 */}
                  <div style={{ 
                    marginTop: 16,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 12, color: '#666' }}>栈底</div>
                  </div>
                </div>
              )}
            </Card>
            {/* 操作历史 */}
            <Card title="操作历史" bordered={false}>
              {operationHistory.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999' }}>
                  暂无操作历史
                </div>
              ) : (
                <List
                  size="small"
                  dataSource={operationHistory}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div style={{ 
                        padding: '4px 8px', 
                        background: '#f5f5f5', 
                        borderRadius: 4,
                        fontSize: 12,
                        width: '100%'
                      }}>
                        {item}
                      </div>
                    </List.Item>
                  )}
                />
              )}
            </Card>

        

            {/* 栈的性质说明 */}
            <Card title="栈的性质" bordered={false}>
              <div style={{ lineHeight: '2' }}>
                <p><Tag color="blue">LIFO</Tag> 后进先出 (Last In, First Out)</p>
                <p><Tag color="green">操作</Tag> 只能在栈顶进行插入和删除</p>
                <p><Tag color="orange">时间复杂度</Tag> Push: O(1), Pop: O(1), Peek: O(1)</p>
              </div>
            </Card>
          </Space>
        </Col>

        {/* 右侧可视化区域 */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {/* 栈操作 */}
            <Card title="栈操作" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {/* 入栈操作 */}
                <Card size="small" title="入栈 (Push)" type="inner">
                  <Form
                    form={pushForm}
                    layout="inline"
                    onFinish={handlePush}
                  >
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入要入栈的值' }]}
                    >
                      <InputNumber 
                        placeholder="输入值" 
                        min={-999} 
                        max={999}
                        style={{ width: '120px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<PlusOutlined />}
                      >
                        入栈
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>

                {/* 出栈和查看操作 */}
                <Card size="small" title="其他操作" type="inner">
                  <Space>
                    <Button 
                      onClick={handlePop}
                      icon={<ArrowUpOutlined />}
                      danger
                    >
                      出栈 (Pop)
                    </Button>
                    <Button 
                      onClick={handlePeek}
                      icon={<EyeOutlined />}
                      type="default"
                    >
                      查看栈顶 (Peek)
                    </Button>
                  </Space>
                </Card>

                {/* 管理操作 */}
                <Card size="small" title="管理操作" type="inner">
                  <Space>
                    <Button 
                      onClick={handleReset}
                      icon={<ReloadOutlined />}
                    >
                      重置
                    </Button>
                    <Popconfirm
                      title="确定要清空栈吗？"
                      onConfirm={handleClear}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button 
                        danger 
                        icon={<DeleteOutlined />}
                      >
                        清空
                      </Button>
                    </Popconfirm>
                  </Space>
                </Card>
              </Space>
            </Card>

            {/* 当前栈内容 */}
            <Card title="栈内容" bordered={false}>
              {stackItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999' }}>
                  栈为空
                </div>
              ) : (
                <List
                  size="small"
                  dataSource={stackItems}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Space>
                        <Tag color={index === 0 ? 'red' : 'blue'}>
                          {index === 0 ? '栈顶' : `位置 ${index}`}
                        </Tag>
                        <span style={{ fontWeight: 'bold', fontSize: 16 }}>{item}</span>
                        {index === 0 && (
                          <Tag color="green" icon={<ArrowUpOutlined />}>
                            下一个出栈
                          </Tag>
                        )}
                      </Space>
                    </List.Item>
                  )}
                />
              )}
            </Card>

            
          </Space>
        </Col>
      </Row>

      {/* 栈的应用示例 */}
      <Card title="栈的实际应用" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small" title="函数调用" bordered={false}>
              <p>程序执行时的函数调用栈</p>
              <Tag color="purple">递归</Tag>
              <Tag color="purple">调用栈</Tag>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="表达式求值" bordered={false}>
              <p>中缀表达式转后缀表达式</p>
              <Tag color="orange">括号匹配</Tag>
              <Tag color="orange">计算器</Tag>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="浏览器历史" bordered={false}>
              <p>浏览器的前进后退功能</p>
              <Tag color="green">撤销操作</Tag>
              <Tag color="green">回退</Tag>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default StackPage;