// pages/LinkedList/index.tsx
import {
  ArrowRightOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Tag,
  message,
  Divider,
  List,
  Alert,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import LinkedList from './model/LinkedList';

const LinkedListPage: React.FC = () => {
  const [prependForm] = Form.useForm();
  const [appendForm] = Form.useForm();
  const [insertForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [deleteForm] = Form.useForm();
  
  const linkedListRef = useRef(new LinkedList());
  const [nodes, setNodes] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [highlightNode, setHighlightNode] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // 初始化一些示例数据
  useEffect(() => {
    linkedListRef.current.fromArray([1, 3, 5, 7, 9]);
    updateDisplay();
    addOperationHistory('初始化链表: [1, 3, 5, 7, 9]');
  }, []);

  // 更新显示
  const updateDisplay = () => {
    setNodes(linkedListRef.current.toArray());
    setAnimationKey(prev => prev + 1); // 触发重新渲染动画
  };

  // 添加操作历史
  const addOperationHistory = (operation: string) => {
    setOperationHistory((prev) => [operation, ...prev.slice(0, 9)]);
  };

  // 头插入
  const handlePrepend = (values: any) => {
    try {
      const { value } = values;
      linkedListRef.current.prepend(Number(value));
      updateDisplay();
      addOperationHistory(`头插入: ${value}`);
      message.success(`在头部插入节点: ${value}`);
      prependForm.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 尾插入
  const handleAppend = (values: any) => {
    try {
      const { value } = values;
      linkedListRef.current.append(Number(value));
      updateDisplay();
      addOperationHistory(`尾插入: ${value}`);
      message.success(`在尾部插入节点: ${value}`);
      appendForm.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 指定位置插入
  const handleInsert = (values: any) => {
    try {
      const { value, position } = values;
      const success = linkedListRef.current.insert(Number(value), Number(position));
      if (success) {
        updateDisplay();
        addOperationHistory(`在位置 ${position} 插入: ${value}`);
        message.success(`在位置 ${position} 插入节点: ${value}`);
        insertForm.resetFields();
      } else {
        message.error('插入位置无效');
      }
    } catch (error) {
      message.error('插入失败，请检查位置是否有效');
    }
  };

  // 删除头节点
  const handleDeleteHead = () => {
    const deletedNode = linkedListRef.current.deleteHead();
    if (deletedNode) {
      updateDisplay();
      addOperationHistory(`删除头节点: ${deletedNode.value}`);
      message.success(`删除头节点: ${deletedNode.value}`);
    } else {
      message.warning('链表为空，无法删除头节点');
    }
  };

  // 删除尾节点
  const handleDeleteTail = () => {
    const deletedNode = linkedListRef.current.deleteTail();
    if (deletedNode) {
      updateDisplay();
      addOperationHistory(`删除尾节点: ${deletedNode.value}`);
      message.success(`删除尾节点: ${deletedNode.value}`);
    } else {
      message.warning('链表为空，无法删除尾节点');
    }
  };

  // 按值删除
  const handleDeleteByValue = (values: any) => {
    const { value } = values;
    const deletedNode = linkedListRef.current.delete(Number(value));
    if (deletedNode) {
      updateDisplay();
      addOperationHistory(`删除值为 ${value} 的节点`);
      message.success(`删除节点: ${deletedNode.value}`);
      deleteForm.resetFields();
    } else {
      message.warning(`未找到值为 ${value} 的节点`);
    }
  };

  // 查找节点
  const handleSearch = (values: any) => {
    const { value } = values;
    const foundNode = linkedListRef.current.find({ value: Number(value) });
    setSearchResult(foundNode);

    if (foundNode) {
      setHighlightNode(foundNode.value.toString());
      addOperationHistory(`查找节点: ${value}`);
      message.success(`找到节点: ${value}`);

      // 3秒后取消高亮
      setTimeout(() => setHighlightNode(null), 3000);
    } else {
      setHighlightNode(null);
      message.warning(`未找到值为 ${value} 的节点`);
    }
    searchForm.resetFields();
  };

  // 反转链表
  const handleReverse = () => {
    linkedListRef.current.reverse();
    updateDisplay();
    addOperationHistory('反转链表');
    message.success('链表已反转');
  };

  // 清空链表
  const handleClear = () => {
    linkedListRef.current.clear();
    setNodes([]);
    setSearchResult(null);
    setHighlightNode(null);
    addOperationHistory('清空链表');
    message.success('链表已清空');
  };

  // 重置链表
  const handleReset = () => {
    linkedListRef.current.clear();
    linkedListRef.current.fromArray([1, 3, 5, 7, 9]);
    updateDisplay();
    setSearchResult(null);
    setHighlightNode(null);
    addOperationHistory('重置链表为初始状态');
    message.success('链表已重置');
  };

  // 获取链表信息
  const getLinkedListInfo = () => {
    const size = nodes.length;
    const isEmpty = size === 0;
    const head = nodes[0]?.value || null;
    const tail = nodes[size - 1]?.value || null;
    
    return { size, isEmpty, head, tail };
  };

  const { size, isEmpty, head, tail } = getLinkedListInfo();

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
                    title="链表长度"
                    value={size}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="头节点"
                    value={head || '空'}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="尾节点"
                    value={tail || '空'}
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="状态"
                    value={isEmpty ? '空' : '非空'}
                    valueStyle={{ color: isEmpty ? '#ff4d4f' : '#52c41a' }}
                  />
                </Col>
              </Row>
            </Card>
             {/* 链表可视化 */}
            <Card 
              title={`链表可视化 ${isEmpty ? '' : `(${size} 个节点)`}`} 
              bordered={false}
              extra={
                !isEmpty && (
                  <Tag color="blue">
                    时间复杂度: 查找 O(n), 插入 O(1), 删除 O(1)
                  </Tag>
                )
              }
            >
              {isEmpty ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 60,
                    color: '#999',
                    border: '2px dashed #d9d9d9',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 8 }}>链表为空</div>
                  <div style={{ fontSize: 12 }}>请使用左侧操作添加节点</div>
                </div>
              ) : (
                <div key={animationKey}>
                  {/* 指针说明 */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: 20,
                    padding: '0 20px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: '#666' }}>Head Pointer</div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#ff4d4f' }}>头指针</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: '#666' }}>Tail Pointer</div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#52c41a' }}>尾指针</div>
                    </div>
                  </div>

                  {/* 链表可视化 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      minHeight: 160,
                      position: 'relative',
                    }}
                  >
                    {/* Head 指针 */}
                    <div style={{ textAlign: 'center', marginRight: 16 }}>
                      <div style={{ fontSize: 12, color: '#ff4d4f', fontWeight: 'bold' }}>HEAD</div>
                      <div style={{ fontSize: 20, color: '#ff4d4f' }}>↓</div>
                    </div>

                    {nodes.map((node, index) => (
                      <div
                        key={index}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        {/* 节点 */}
                        <div
                          style={{
                            border: `2px solid ${
                              highlightNode === node.value.toString()
                                ? '#ff4d4f'
                                : '#1890ff'
                            }`,
                            borderRadius: 12,
                            padding: '20px 16px',
                            margin: '0 8px',
                            minWidth: 100,
                            textAlign: 'center',
                            background:
                              highlightNode === node.value.toString()
                                ? 'linear-gradient(135deg, #fff2f0 0%, #ffccc7 100%)'
                                : 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            boxShadow:
                              highlightNode === node.value.toString()
                                ? '0 0 12px rgba(255,77,79,0.4)'
                                : '0 2px 8px rgba(0,0,0,0.1)',
                            transform: highlightNode === node.value.toString() ? 'scale(1.05)' : 'scale(1)',
                          }}
                        >
                          <div style={{ fontWeight: 'bold', fontSize: 20, color: '#1890ff' }}>
                            {node.value}
                          </div>
                          <div
                            style={{ 
                              fontSize: 12, 
                              color: '#666', 
                              marginTop: 6,
                              background: '#f5f5f5',
                              padding: '2px 6px',
                              borderRadius: 4
                            }}
                          >
                            位置: {index}
                          </div>
                          
                          {/* 下一个指针指示 */}
                          {node.next && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: -25,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: 12,
                                color: '#52c41a',
                                background: '#f6ffed',
                                padding: '2px 8px',
                                borderRadius: 4,
                                border: '1px solid #b7eb8f'
                              }}
                            >
                              next →
                            </div>
                          )}
                        </div>

                        {/* 箭头 */}
                        {index < nodes.length - 1 && (
                          <div
                            style={{
                              margin: '0 16px',
                              fontSize: 28,
                              color: '#1890ff',
                              animation: 'pulse 2s infinite',
                            }}
                          >
                            <ArrowRightOutlined />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Tail 指针 */}
                    {nodes.length > 0 && (
                      <div style={{ textAlign: 'center', marginLeft: 16 }}>
                        <div style={{ fontSize: 12, color: '#52c41a', fontWeight: 'bold' }}>TAIL</div>
                        <div style={{ fontSize: 20, color: '#52c41a' }}>↓</div>
                      </div>
                    )}
                  </div>

                  {/* NULL 指示器 */}
                  {nodes.length > 0 && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: 20,
                      color: '#999',
                      fontSize: 14
                    }}>
                      <Tag color="default">null</Tag>
                      <span style={{ marginLeft: 8 }}>链表结束</span>
                    </div>
                  )}
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
                      <div
                        style={{
                          padding: '8px 12px',
                          background: index === 0 ? '#f6ffed' : '#f5f5f5',
                          border: index === 0 ? '1px solid #b7eb8f' : '1px solid #d9d9d9',
                          borderRadius: 4,
                          fontSize: 12,
                          width: '100%',
                        }}
                      >
                        {item}
                      </div>
                    </List.Item>
                  )}
                />
              )}
            </Card>

          
          </Space>
        </Col>

        {/* 右侧可视化区域 */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
           

            {/* 查找结果 */}
            {searchResult && (
              <Card title="查找结果" bordered={false}>
                <Alert
                  message={
                    <Space>
                      <Tag color="success">找到节点</Tag>
                      <span>值: <strong>{searchResult.value}</strong></span>
                      <span>位置: <strong>
                        {nodes.findIndex((node) => node.value === searchResult.value)}
                      </strong></span>
                    </Space>
                  }
                  type="success"
                  showIcon
                />
              </Card>
            )}
              {/* 添加节点操作 */}
            <Card title="添加节点" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {/* 头插入 */}
                <Card size="small" title="头插入 (Prepend)" type="inner">
                  <Form form={prependForm} layout="inline" onFinish={handlePrepend}>
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入节点值' }]}
                    >
                      <InputNumber 
                        placeholder="节点值" 
                        min={-999} 
                        max={999}
                        style={{ width: '120px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                        头插入
                      </Button>
                    </Form.Item>
                  </Form>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    在链表头部添加新节点
                  </div>
                </Card>

                {/* 尾插入 */}
                <Card size="small" title="尾插入 (Append)" type="inner">
                  <Form form={appendForm} layout="inline" onFinish={handleAppend}>
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入节点值' }]}
                    >
                      <InputNumber 
                        placeholder="节点值" 
                        min={-999} 
                        max={999}
                        style={{ width: '120px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                        尾插入
                      </Button>
                    </Form.Item>
                  </Form>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    在链表尾部添加新节点
                  </div>
                </Card>

                {/* 指定位置插入 */}
                <Card size="small" title="指定位置插入 (Insert)" type="inner">
                  <Form form={insertForm} layout="inline" onFinish={handleInsert}>
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入节点值' }]}
                    >
                      <InputNumber 
                        placeholder="节点值" 
                        min={-999} 
                        max={999}
                        style={{ width: '100px' }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="position"
                      rules={[{ required: true, message: '请输入位置' }]}
                    >
                      <InputNumber
                        placeholder="位置"
                        min={0}
                        max={size}
                        style={{ width: '80px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="dashed" htmlType="submit">
                        插入
                      </Button>
                    </Form.Item>
                  </Form>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    位置范围: 0 ~ {size} (0表示头部，{size}表示尾部)
                  </div>
                </Card>
              </Space>
            </Card>

            {/* 删除节点操作 */}
            <Card title="删除节点" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Space>
                  <Button 
                    onClick={handleDeleteHead} 
                    danger 
                    icon={<LogoutOutlined />}
                    disabled={isEmpty}
                  >
                    删除头节点
                  </Button>
                  <Button 
                    onClick={handleDeleteTail} 
                    danger 
                    icon={<LogoutOutlined />}
                    disabled={isEmpty}
                  >
                    删除尾节点
                  </Button>
                </Space>

                <Card size="small" title="按值删除" type="inner">
                  <Form form={deleteForm} layout="inline" onFinish={handleDeleteByValue}>
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入要删除的值' }]}
                    >
                      <InputNumber 
                        placeholder="要删除的值" 
                        style={{ width: '120px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button danger htmlType="submit" icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Space>
            </Card>

            {/* 查找和其他操作 */}
            <Card title="查找和其他操作" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Card size="small" title="查找节点" type="inner">
                  <Form form={searchForm} layout="inline" onFinish={handleSearch}>
                    <Form.Item
                      name="value"
                      rules={[{ required: true, message: '请输入查找值' }]}
                    >
                      <InputNumber 
                        placeholder="查找值" 
                        style={{ width: '120px' }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="default" htmlType="submit" icon={<SearchOutlined />}>
                        查找
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>

                <Space>
                  <Button
                    type="dashed"
                    onClick={handleReverse}
                    icon={<PlayCircleOutlined />}
                    disabled={isEmpty}
                  >
                    反转链表
                  </Button>
                  <Button onClick={handleReset} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                  <Popconfirm
                    title="确定要清空链表吗？"
                    onConfirm={handleClear}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button danger icon={<DeleteOutlined />} disabled={isEmpty}>
                      清空
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </Card>

            {/* 链表信息 */}
            <Card title="链表信息" bordered={false}>
              <List size="small">
                <List.Item>
                  <span>链表类型:</span>
                  <Tag color="blue">单向链表</Tag>
                </List.Item>
                <List.Item>
                  <span>存储方式:</span>
                  <Tag color="purple">链式存储</Tag>
                </List.Item>
                <List.Item>
                  <span>内存分配:</span>
                  <Tag color="orange">动态分配</Tag>
                </List.Item>
                <List.Item>
                  <span>优势:</span>
                  <Tag color="green">插入删除快</Tag>
                </List.Item>
                <List.Item>
                  <span>劣势:</span>
                  <Tag color="red">随机访问慢</Tag>
                </List.Item>
              </List>
            </Card>

        
          </Space>
        </Col>
      </Row>

      {/* 链表特性说明 */}
      <Card title="链表特性" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small" title="时间复杂度" bordered={false}>
              <List size="small">
                <List.Item>访问: <Tag color="red">O(n)</Tag></List.Item>
                <List.Item>搜索: <Tag color="red">O(n)</Tag></List.Item>
                <List.Item>插入: <Tag color="green">O(1)</Tag></List.Item>
                <List.Item>删除: <Tag color="green">O(1)</Tag></List.Item>
              </List>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="空间复杂度" bordered={false}>
              <List size="small">
                <List.Item>空间: <Tag color="orange">O(n)</Tag></List.Item>
                <List.Item>每个节点需要额外指针</List.Item>
                <List.Item>动态内存分配</List.Item>
              </List>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="应用场景" bordered={false}>
              <List size="small">
                <List.Item>实现栈和队列</List.Item>
                <List.Item>动态内存管理</List.Item>
                <List.Item>图邻接表</List.Item>
                <List.Item>多项式运算</List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default LinkedListPage;