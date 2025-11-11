// src/pages/Queue/index.tsx
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
  ArrowRightOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Queue from './model/Queue';

const QueuePage: React.FC = () => {
  const [enqueueForm] = Form.useForm();
  const queueRef = useRef(new Queue());
  const [queueItems, setQueueItems] = useState<number[]>([]);
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [frontItem, setFrontItem] = useState<number | null>(null);
  const [rearItem, setRearItem] = useState<number | null>(null);

  // 初始化示例数据
  useEffect(() => {
    queueRef.current.enqueue(10);
    queueRef.current.enqueue(20);
    queueRef.current.enqueue(30);
    updateDisplay();
    addOperationHistory('初始化队列: [10, 20, 30]');
  }, []);

  // 更新显示
  const updateDisplay = () => {
    setQueueItems(queueRef.current.toArray());
    setFrontItem(queueRef.current.peek());
    setRearItem(queueRef.current.getRear());
  };

  // 添加操作历史
  const addOperationHistory = (operation: string) => {
    setOperationHistory(prev => [operation, ...prev.slice(0, 9)]);
  };

  // 入队操作
  const handleEnqueue = (values: any) => {
    try {
      const { value } = values;
      queueRef.current.enqueue(Number(value));
      updateDisplay();
      addOperationHistory(`入队(Enqueue): ${value}`);
      message.success(`元素 ${value} 已加入队列`);
      enqueueForm.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 出队操作
  const handleDequeue = () => {
    const dequeuedValue = queueRef.current.dequeue();
    if (dequeuedValue !== null) {
      updateDisplay();
      addOperationHistory(`出队(Dequeue): ${dequeuedValue}`);
      message.success(`元素 ${dequeuedValue} 已出队`);
    } else {
      message.warning('队列为空，无法执行出队操作');
    }
  };

  // 查看队首元素
  const handlePeek = () => {
    const front = queueRef.current.peek();
    if (front !== null) {
      addOperationHistory(`查看队首(Peek): ${front}`);
      message.info(`队首元素: ${front}`);
    } else {
      message.warning('队列为空');
    }
  };

  // 清空队列
  const handleClear = () => {
    queueRef.current.clear();
    updateDisplay();
    addOperationHistory('清空队列');
    message.success('队列已清空');
  };

  // 重置队列
  const handleReset = () => {
    queueRef.current.clear();
    queueRef.current.enqueue(10);
    queueRef.current.enqueue(20);
    queueRef.current.enqueue(30);
    updateDisplay();
    addOperationHistory('重置队列为初始状态');
    message.success('队列已重置');
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
                <Col span={6}>
                  <Statistic 
                    title="队列大小" 
                    value={queueItems.length}
                    suffix={`/ ∞`}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="队首元素" 
                    value={frontItem !== null ? frontItem : '空'}
                    valueStyle={{ 
                      color: frontItem !== null ? '#3f8600' : '#cf1322' 
                    }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="队尾元素" 
                    value={rearItem !== null ? rearItem : '空'}
                    valueStyle={{ 
                      color: rearItem !== null ? '#3f8600' : '#cf1322' 
                    }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="队列状态" 
                    value={queueRef.current.isEmpty() ? '空' : '非空'}
                  />
                </Col>
              </Row>
            </Card>
             <Card title={`队列可视化 (FIFO - 先进先出)`} bordered={false}>
              {queueItems.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: 60, 
                  color: '#999',
                  border: '2px dashed #d9d9d9',
                  borderRadius: 8
                }}>
                  <div>队列为空</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>请执行入队操作添加元素</div>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 300,
                  position: 'relative'
                }}>
                  {/* 队列方向指示 */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 20
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#ff4d4f' }}>队首 (Front)</div>
                      <div style={{ fontSize: 12, color: '#666' }}>出队方向</div>
                      <LogoutOutlined style={{ fontSize: 20, color: '#ff4d4f', marginTop: 4 }} />
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#52c41a' }}>队尾 (Rear)</div>
                      <div style={{ fontSize: 12, color: '#666' }}>入队方向</div>
                      <LoginOutlined style={{ fontSize: 20, color: '#52c41a', marginTop: 4 }} />
                    </div>
                  </div>

                  {/* 队列容器 */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                    minHeight: 120
                  }}>
                    {queueItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          border: '2px solid #1890ff',
                          borderRadius: 8,
                          padding: '16px 20px',
                          minWidth: 80,
                          textAlign: 'center',
                          background: index === 0 
                            ? 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)' 
                            : index === queueItems.length - 1
                            ? 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)'
                            : 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 18,
                          position: 'relative',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {item}
                        {index === 0 && (
                          <div style={{ 
                            position: 'absolute',
                            top: -20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 12,
                            background: '#ff4d4f',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: 4
                          }}>
                            队首
                          </div>
                        )}
                        {index === queueItems.length - 1 && (
                          <div style={{ 
                            position: 'absolute',
                            bottom: -20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 12,
                            background: '#52c41a',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: 4
                          }}>
                            队尾
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 队列流动方向 */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: 20
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span>出队方向</span>
                      <ArrowRightOutlined style={{ margin: '0 8px' }} />
                      <span>[队首]</span>
                      {queueItems.map((_, index) => (
                        <React.Fragment key={index}>
                          <ArrowRightOutlined style={{ margin: '0 4px' }} />
                          <span>●</span>
                        </React.Fragment>
                      ))}
                      <ArrowRightOutlined style={{ margin: '0 8px' }} />
                      <span>[队尾]</span>
                      <ArrowRightOutlined style={{ margin: '0 8px' }} />
                      <span>入队方向</span>
                    </div>
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

        

            {/* 队列的性质说明 */}
            <Card title="队列的性质" bordered={false}>
              <div style={{ lineHeight: '2' }}>
                <p><Tag color="blue">FIFO</Tag> 先进先出 (First In, First Out)</p>
                <p><Tag color="green">入队</Tag> 在队尾添加元素</p>
                <p><Tag color="orange">出队</Tag> 在队首移除元素</p>
                <p><Tag color="purple">时间复杂度</Tag> Enqueue: O(1), Dequeue: O(1), Peek: O(1)</p>
              </div>
            </Card>
          </Space>
        </Col>

        {/* 右侧可视化区域 */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {/* 队列的可视化 */}
           
    {/* 队列操作 */}
            <Card title="队列操作" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {/* 入队操作 */}
                <Card size="small" title="入队 (Enqueue)" type="inner">
                  <Form
                    form={enqueueForm}
                    layout="inline"
                    onFinish={handleEnqueue}
                  >
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入要入队的值' }]}
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
                        icon={<LoginOutlined />}
                      >
                        入队
                      </Button>
                    </Form.Item>
                  </Form>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    新元素添加到队尾
                  </div>
                </Card>

                {/* 出队和查看操作 */}
                <Card size="small" title="其他操作" type="inner">
                  <Space>
                    <Button 
                      onClick={handleDequeue}
                      icon={<LogoutOutlined />}
                      danger
                    >
                      出队 (Dequeue)
                    </Button>
                    <Button 
                      onClick={handlePeek}
                      icon={<EyeOutlined />}
                      type="default"
                    >
                      查看队首 (Peek)
                    </Button>
                  </Space>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    出队操作从队首移除元素
                  </div>
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
                      title="确定要清空队列吗？"
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
            {/* 当前队列内容 */}
            <Card title="队列内容" bordered={false}>
              {queueItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999' }}>
                  队列为空
                </div>
              ) : (
                <List
                  size="small"
                  dataSource={queueItems}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Space>
                        <Tag color={
                          index === 0 ? 'red' : 
                          index === queueItems.length - 1 ? 'green' : 'blue'
                        }>
                          {index === 0 ? '队首' : 
                           index === queueItems.length - 1 ? '队尾' : `位置 ${index}`}
                        </Tag>
                        <span style={{ fontWeight: 'bold', fontSize: 16 }}>{item}</span>
                        {index === 0 && (
                          <Tag color="red" icon={<LogoutOutlined />}>
                            下一个出队
                          </Tag>
                        )}
                        {index === queueItems.length - 1 && (
                          <Tag color="green" icon={<LoginOutlined />}>
                            最后入队
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

      {/* 队列的应用示例 */}
      <Card title="队列的实际应用" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card size="small" title="消息队列" bordered={false}>
              <p>异步任务处理</p>
              <Tag color="purple">RabbitMQ</Tag>
              <Tag color="purple">Kafka</Tag>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="打印队列" bordered={false}>
              <p>打印机任务管理</p>
              <Tag color="orange">任务调度</Tag>
              <Tag color="orange">先来先服务</Tag>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="广度优先搜索" bordered={false}>
              <p>图的遍历算法</p>
              <Tag color="green">BFS</Tag>
              <Tag color="green">层级遍历</Tag>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="CPU 调度" bordered={false}>
              <p>进程调度管理</p>
              <Tag color="blue">Round Robin</Tag>
              <Tag color="blue">任务队列</Tag>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 队列与栈的对比 */}
      <Card title="队列 vs 栈" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="队列 (Queue)" bordered={false}>
              <p><strong>FIFO - 先进先出</strong></p>
              <ul>
                <li>入队(Enqueue) - 队尾添加</li>
                <li>出队(Dequeue) - 队首移除</li>
                <li>像排队买票</li>
                <li>应用：消息队列、BFS</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="栈 (Stack)" bordered={false}>
              <p><strong>LIFO - 后进先出</strong></p>
              <ul>
                <li>入栈(Push) - 栈顶添加</li>
                <li>出栈(Pop) - 栈顶移除</li>
                <li>像叠盘子</li>
                <li>应用：函数调用、DFS</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default QueuePage;