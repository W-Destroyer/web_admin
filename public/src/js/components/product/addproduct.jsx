import { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Upload,
    Modal,
    message
} from 'antd';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const AutoCompleteOption = AutoComplete.Option;

import {
    initClassify
} from '../../actions/classify';

import {
    addProduct,
    saveProduct,
    clearProductAdditionNotify
} from '../../actions/product';

class AddProductForm extends Component {
    constructor() {
        super();
        this.formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
                md: {
                    span: 4
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
                md: {
                    span: 10
                }
            },
        };
        this.tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, router } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err)
                return console.log(err)
            console.log(values);
            dispatch(saveProduct({
                name: values.productName,
                type: values.classify,
                price: values.price,
                colors: values.colorKeys.map(item => {
                    return values['colors_' + item]
                }),
                sizes: values.sizeKeys.map(item => {
                    return values['sizes_' + item]
                }),
                masterPic: values.masterPic[0].response.data,
                productImages: values.productImages.map(item => item.response.data),
                describe: values.describe
            }))
        })
    }

    goBack = (e) => {
        const { productAddition, router } = this.props;
        const { isFetching } = productAddition;
        if (isFetching) return;

        Modal.confirm({
            title: '确定取消?',
            onOk: () => {
                setTimeout(() => {
                    router.go(-1);
                }, 200);
            },
        });
        
    }

    componentDidUpdate() {
        const { router, productAddition, dispatch } = this.props;
        if (productAddition.saveSuccessful === true) {
            message.success(productAddition.message);
            dispatch(clearProductAdditionNotify());
            setTimeout(() => {
                router.go(-1);
            }, 500)
        }
    }

    render() {
        const { dispatch, classify, productAddition, form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = this.formItemLayout;
        const tailFormItemLayout = this.tailFormItemLayout;
        const isLoading = productAddition.isFetching;
        return (
            <Form onSubmit={this.handleSubmit}>
                <ProductName 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                />
                
                <ProductType 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    classify={classify}
                    dispatch={dispatch}
                />

                <ProductPrice 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                />

                <ProductColor
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={getFieldValue}
                    form={form}
                />

                <ProductSize
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={getFieldValue}
                    form={form}
                />

                <ProductDescribe 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                />
                
                <ProductMasterPic 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                />

                <ProductInfoPic 
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                />
                
                <FormItem {...tailFormItemLayout}>
                    <Button style={{fontWeight: '300', margin: '0 10px'}} type="primary" loading={isLoading} htmlType="submit">保存</Button>
                    <Button style={{fontWeight: '300', margin: '0 10px'}} type="primary" onClick={this.goBack}>取消</Button>
                </FormItem>
            </Form>

        );
    }
}

class ProductName extends Component {
    constructor() {
        super();
    }
    render() {

        const { getFieldDecorator, formItemLayout } = this.props;

        return (
            <FormItem
                {...formItemLayout}
                label="名称"
                hasFeedback
            >{
                getFieldDecorator('productName', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '产品名称不能为空!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
        )
    }
}

class ProductType extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        const { dispatch, classify } = this.props;
        if(!classify.data.length)
            dispatch(initClassify());
    }

    render() {
        const { getFieldDecorator, formItemLayout, classify } = this.props;

        const classifyOption = classify.data.map(item => {
            
            return (
                <OptGroup key={item.id} label={item.name}>
                {
                    item.children && item.children.map(child => {
                        return (
                            <Option key={child.id} value={child.id.toString()} >{ child.name }</Option>
                        )
                    })
                }
                </OptGroup>
            )
        })
        const classifySelector = getFieldDecorator('classify', {
            rules: [{
                required: true,
                message: '请选择产品分类！'
            }]
        })(
            <Select
                placeholder = "请选择产品分类！"
                notFoundContent = '暂无分类！'
                dropdownStyle = {{}}
            >
                { classifyOption }
            </Select>
        )


        return (
            <FormItem
                {...formItemLayout}
                label="分类"
                hasFeedback
            >
                {classifySelector}
            </FormItem>
        )
    }
}

class ProductPrice extends Component {
    constructor() {
        super();
    }

    render() {
        const { getFieldDecorator, formItemLayout } = this.props;
        return (
            <FormItem
                {...formItemLayout}
                label="价格"
                hasFeedback
            >{
                getFieldDecorator('price', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '请设置该产品价格!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            
        )
    }
}

class ProductColor extends Component {
    constructor() {
        super();
        this.uuid = 0;
    }

    addColor() {
        this.uuid++;
        const { form, getFieldValue } = this.props;
        // can use data-binding to get
        const colorKeys = form.getFieldValue('colorKeys');
        const nextColorKeys = colorKeys.concat(this.uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            colorKeys: nextColorKeys,
        });
    }

    removeColor(k) {
        const { form } = this.props;
        const colorKeys = form.getFieldValue('colorKeys');

        form.setFieldsValue({
            colorKeys: colorKeys.filter(key => key !== k)
        })
    }

    render() {
        const { getFieldDecorator, formItemLayout, getFieldValue } = this.props;
        
        getFieldDecorator('colorKeys', { initialValue: [] });
        const colorKeys = getFieldValue('colorKeys');
        const colorFormItems = colorKeys.map((k, index) => {
            return (
                <Col
                    span={6}
                    key={k}
                >
                    <FormItem
                        style={{
                            marginBottom: '8px'
                        }}
                    >
                        {getFieldDecorator(`colors_${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "不得为空.",
                            }],
                        })(
                            <Input style={{ width: '80%', marginRight: 8 }} />
                        )}
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={colorKeys.length === 1}
                            onClick={() => this.removeColor(k)}
                        />
                    </FormItem>
                </Col>
            );
        });

        return (
            <FormItem 
                {...formItemLayout}
                label="颜色"
            >
                <Row type="flex" gutter={16}>
                    {colorFormItems}
                    <Col span={6}>
                        <Button type="dashed" onClick={() => this.addColor()}>
                            <Icon type="plus" /> 添加分类
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        )
    }
}

class ProductSize extends Component {
    constructor() {
        super();
        this.uuid = 0;
    }

    addSize() {
        this.uuid++;
        const { form, getFieldValue } = this.props;
        // can use data-binding to get
        const sizeKeys = form.getFieldValue('sizeKeys');
        const nextSizeKeys = sizeKeys.concat(this.uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            sizeKeys: nextSizeKeys,
        });
    }

    removeSize(k) {
        const { form } = this.props;
        const sizeKeys = form.getFieldValue('sizeKeys');

        form.setFieldsValue({
            sizeKeys: sizeKeys.filter(key => key !== k)
        })
    }

    render() {
        const { getFieldDecorator, formItemLayout, getFieldValue } = this.props;
       
        getFieldDecorator('sizeKeys', { initialValue: [] });
        const sizeKeys = getFieldValue('sizeKeys');
        const sizeFormItems = sizeKeys.map((key, index) => {
            return (
                <Col span={6} key={key}>
                    <FormItem 
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        {getFieldDecorator(`sizes_${key}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "不得为空.",
                            }],
                        })(
                            <Input style={{ width: '80%', marginRight: 8 }} />
                        )}
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={sizeKeys.length === 1}
                            onClick={() => this.removeSize(k)}
                        />
                    </FormItem>
                </Col>
            );
        });

        return (
            <FormItem
                {...formItemLayout}
                label="型号"
            >
                <Row type="flex" gutter={16}>
                    {sizeFormItems}
                    <Col span={6}>
                        <Button type="dashed" onClick={() => this.addSize()}>
                            <Icon type="plus" /> 添加分类
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        )
    }
}

class ProductDescribe extends Component {
    constructor() {
        super();
    }

    render() {
        const { getFieldDecorator, formItemLayout } = this.props;
        return(
            <FormItem
                {...formItemLayout}
                label="描述"
                hasFeedback
            >{
                getFieldDecorator('describe', {
                    rules: [{
                        message: 'Please confirm your password!',
                    }],
                })(
                    <Input type="textarea" onBlur={this.handleConfirmBlur} />
                )}
            </FormItem>
        )
    }
}

class ProductMasterPic extends Component {
    constructor() {
        super();
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }
    
    normFile(e) {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    imageValidator = (rule, value, callback) => {
        if (!value)
            return callback();
        if(!value.length)
            return callback()
        var imageRegExp = new RegExp('(jpg|jpeg|png|gif|bmp)$');
        if(!imageRegExp.test(value[value.length - 1].name))
            callback('请上传图片文件！')
        callback()
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange({file, fileList, event}) {
        // console.log(file)
        // console.log(file, fileList, event)
        this.setState({
            fileList
        })
    }

    handleCancel = () => this.setState({ previewVisible: false })
 
    setData(data) {
        return Object.assign({}, data, {
            type: 'product',
            title: 'masterPic'
        })
    }

    render() {
        const { getFieldDecorator, formItemLayout } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = fileList.length < 1 ? (
            <div>
                <Icon type="plus" style={{
                    fontSize: "28px",
                    color: "#999"
                }}/>
                <div className="ant-upload-text" style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#666"
                }}>点击上传</div>
            </div>
        ) : null;

        return (
            <FormItem
                {...formItemLayout}
                label="产品主图"
                hasFeedback
            >
                {getFieldDecorator('masterPic', {
                    valuePropName: 'fileList',
                    rules: [{
                        required: true,
                        message: '请上传产品主图！'
                    }, {
                        validator: this.imageValidator
                    }],
                    getValueFromEvent: this.normFile,
                })(
                    <Upload
                        name="masterPic"
                        action="http://localhost:8080/upload/productImages"
                        listType="picture-card"
                        data={this.setData}
                        onPreview={this.handlePreview}
                        onChange={(e) => this.handleChange(e)}
                        onProgress={(e, file) => this.onProgress(e, file)}
                        customRequest={customUploadRequest}
                    >{uploadButton}</Upload>
                )}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </FormItem>
        )
    }
}

class ProductInfoPic extends Component {
    constructor() {
        super();
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    imageValidator = (rule, value, callback) => {
        if (!value) 
            return callback()
        if(!value.length)
            return callback()
        var imageRegExp = new RegExp('(jpg|jpeg|png|gif|bmp)$');
        if(!imageRegExp.test(value[value.length - 1].name))
            callback('请上传图片文件！')
        callback()
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    handleCancel = () => this.setState({ previewVisible: false })

    setData(data) {
        return Object.assign({}, data, {
            type: 'product',
            title: 'productImages'
        })
    }

    render() {
        const { getFieldDecorator, formItemLayout } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;

        return (
            <FormItem
                {...formItemLayout}
                label="产品详情图"
                hasFeedback
            >
                {getFieldDecorator('productImages', {
                    valuePropName: 'fileList',
                    rules: [{
                        required: true,
                        message: '请上传产品详情图！'
                    }, {
                        validator: this.imageValidator
                    }],
                    getValueFromEvent: this.normFile,
                })(
                    <Upload
                        name="productImages"
                        action="http://localhost:8080/upload/productImages"
                        listType="picture-card"
                        data={this.setData}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        customRequest={customUploadRequest}
                    >
                        <div>
                            <Icon type="plus" style={{
                                fontSize: "28px",
                                color: "#999"
                            }}/>
                            <div className="ant-upload-text" style={{
                                marginTop: "8px",
                                fontSize: "12px",
                                color: "#666"
                            }}>点击上传</div>
                        </div>
                    </Upload>
                )}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </FormItem>
        )
    }
}

// option {
//    onProgress: (event: { percent: number }): void,
//    onError: (event: Error, body?: Object): void,
//    onSuccess: (body: Object): void,
//    data: Object,
//    filename: String,
//    file: File,
//    withCredentials: Boolean,
//    action: String,
//    headers: Object,
// }

function customUploadRequest(option) {
    console.log(option);
    var xhr = new XMLHttpRequest();

    if (option.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    var formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(function(key) {
            formData.append(key, option.data[key]);
        });
    }

    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = () => {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr));
    };

    xhr.open('post', option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    var headers = option.headers || {};

    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (var h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);

    return {
        abort: function abort() {
            xhr.abort();
        }
    };
}

function getError(option, xhr) {
    var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

const WrappedAddProductForm = Form.create()(AddProductForm);

const mapStateToProps = (state, ownProps) => {

    return {
        classify: state.commodity.classify,
        productAddition: state.commodity.productAddition
    }
}

export default connect(mapStateToProps)(WrappedAddProductForm)
