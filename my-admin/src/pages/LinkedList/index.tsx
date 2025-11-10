// pages/LinkedList/index.tsx
import {
  ArrowRightOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
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
  Select,
  Space,
  Statistic,
  Tag,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import LinkedList from './model/LinkedList';

const { Option } = Select;

const LinkedListPage: React.FC = () => {
  const [addForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [insertForm] = Form.useForm();
  const linkedListRef = useRef(new LinkedList());
  const [nodes, setNodes] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [highlightNode, setHighlightNode] = useState<string | null>(null);

  // 初始化一些示例数据
  useEffect(() => {
    linkedListRef.current.fromArray([1, 3, 5, 7, 9]);
    updateDisplay();
    addOperationHistory('初始化链表: [1, 3, 5, 7, 9]');
  }, []);

  // 更新显示
  const updateDisplay = () => {
    setNodes(linkedListRef.current.toArray());
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
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 指定位置插入
  const handleInsert = (values: any) => {
    try {
      const { value, position } = values;
      linkedListRef.current.insert(Number(value), Number(position));
      updateDisplay();
      addOperationHistory(`在位置 ${position} 插入: ${value}`);
      message.success(`在位置 ${position} 插入节点: ${value}`);
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
                    title="链表长度"
                    valueStyle={{ color: '#1F3C7A' }}
                    value={nodes.length}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="头节点"
                    valueStyle={{ color: '#26917A' }}
                    value={nodes[0]?.value || '空'}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    valueStyle={{ color: '#CDFF9E' }}
                    title="尾节点"
                    value={nodes[nodes.length - 1]?.value || '空'}
                  />
                </Col>
              </Row>
            </Card>
            {/* 链表可视化 */}
            <Card title="链表可视化" bordered={false}>
              {nodes.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 40,
                    color: '#999',
                    border: '2px dashed #d9d9d9',
                    borderRadius: 8,
                  }}
                >
                  链表为空，请添加节点
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    minHeight: 120,
                  }}
                >
                  {/* Head 指针 */}
                  <div style={{ textAlign: 'center', marginRight: 16 }}>
                    <div style={{ fontSize: 12, color: '#666' }}>Head</div>
                    <div style={{ fontSize: 18 }}>➡<span style={{fontSize:12}}>（头指针）</span></div>
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
                          borderRadius: 8,
                          padding: '16px 20px',
                          margin: '0 8px',
                          minWidth: 80,
                          textAlign: 'center',
                          background:
                            highlightNode === node.value.toString()
                              ? '#fff2f0'
                              : '#f0f8ff',
                          position: 'relative',
                          transition: 'all 0.3s',
                          boxShadow:
                            highlightNode === node.value.toString()
                              ? '0 0 8px rgba(255,77,79,0.3)'
                              : 'none',
                        }}
                      >
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                          {node.value}
                        </div>
                        <div
                          style={{ fontSize: 12, color: '#666', marginTop: 4 }}
                        >
                          位置: {index}
                        </div>
                        {/* 下一个指针指示 */}
                        {node.next && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: -20,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              fontSize: 12,
                              color: '#52c41a',
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
                            fontSize: 24,
                            color: '#1890ff',
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
                      <div style={{ fontSize: 12, color: '#666' }}>Tail</div>
                      <div style={{ fontSize: 18 }}>↓</div>
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
                <Space direction="vertical" style={{ width: '100%' }}>
                  {operationHistory.map((op, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      {op}
                    </div>
                  ))}
                </Space>
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
                <Space>
                  <Tag color="green">找到节点</Tag>
                  <span>值: {searchResult.value}</span>
                  <span>
                    位置:{' '}
                    {nodes.findIndex(
                      (node) => node.value === searchResult.value,
                    )}
                  </span>
                </Space>
              </Card>
            )}
            {/* 添加操作 */}
            <Card title="添加节点" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Form
                  layout="inline"
                  onFinish={handlePrepend}
                  style={{ marginBottom: 16 }}
                >
                  <Form.Item
                    name="value"
                    rules={[{ required: true, message: '请输入节点值' }]}
                  >
                    <InputNumber placeholder="节点值" min={0} max={100} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      头插入
                    </Button>
                  </Form.Item>
                </Form>

                <Form
                  layout="inline"
                  onFinish={handleAppend}
                  style={{ marginBottom: 16 }}
                >
                  <Form.Item
                    name="value"
                    rules={[{ required: true, message: '请输入节点值' }]}
                  >
                    <InputNumber placeholder="节点值" min={0} max={100} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      尾插入
                    </Button>
                  </Form.Item>
                </Form>

                <Form layout="inline" onFinish={handleInsert}>
                  <Form.Item
                    name="value"
                    rules={[{ required: true, message: '请输入节点值' }]}
                  >
                    <InputNumber placeholder="节点值" min={0} max={100} />
                  </Form.Item>
                  <Form.Item
                    name="position"
                    rules={[{ required: true, message: '请输入位置' }]}
                  >
                    <InputNumber
                      placeholder="位置"
                      min={0}
                      max={nodes.length}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="dashed" htmlType="submit">
                      指定位置插入
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Card>

            {/* 删除操作 */}
            <Card title="删除节点" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                  <Button danger onClick={handleDeleteHead}>
                    删除头节点
                  </Button>
                  <Button danger onClick={handleDeleteTail}>
                    删除尾节点
                  </Button>
                </Space>

                <Form layout="inline" onFinish={handleDeleteByValue}>
                  <Form.Item
                    name="value"
                    rules={[{ required: true, message: '请输入节点值' }]}
                  >
                    <InputNumber placeholder="要删除的值" />
                  </Form.Item>
                  <Form.Item>
                    <Button danger htmlType="submit">
                      按值删除
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Card>

            {/* 查找和其他操作 */}
            <Card title="查找和其他操作" bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Form layout="inline" onFinish={handleSearch}>
                  <Form.Item
                    name="value"
                    rules={[{ required: true, message: '请输入查找值' }]}
                  >
                    <InputNumber placeholder="查找值" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="default"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                    >
                      查找
                    </Button>
                  </Form.Item>
                </Form>

                <Space>
                  <Button
                    type="dashed"
                    onClick={handleReverse}
                    icon={<PlayCircleOutlined />}
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
                    <Button danger icon={<DeleteOutlined />}>
                      清空
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default LinkedListPage;
