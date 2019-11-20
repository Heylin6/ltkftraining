<template>
        <div style="text-align: center;">
                    <div style="padding:0 0 15px 0" class="mb-3">
                        <h4>有任何疑問嗎 ? 歡迎來信詢問</h4>
                    </div>
                    <form action="#"
                          method="post"
                          accept-charset="utf-8">
                            <div style="padding: 5px;">
                                    <div class="row">
                                        <div class="container col-lg-8 col-md-8 col-sm-8"
                                             style="padding-bottom: 10px;">
                                             <input class="form-control"
                                                     name="firstname"
                                                     placeholder="您的大名"
                                                     type="text"
                                                     required=""
                                                     autofocus="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="container col-lg-8 col-md-8 col-sm-8"
                                             style="padding-bottom: 10px;">
                                             <input class="form-control"
                                                    name="email"
                                                    placeholder="您的E-mail"
                                                    type="email"
                                                    required="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="container col-lg-8 col-md-8 col-sm-8"
                                             style="padding-bottom: 10px;">
                                             <input class="form-control"
                                                    name="subject"
                                                    placeholder="主旨"
                                                    type="text"
                                                    required="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="container col-lg-8 col-md-8 col-sm-8">
                                            <textarea style="resize:vertical;"
                                                      class="form-control"
                                                      placeholder="內容填寫"
                                                      rows="6"
                                                      name="comment"
                                                      required="">
                                            </textarea>
                                        </div>
                                    </div>
                            </div>
                            <div class="panel-footer" style="padding:15px 0 0 0">
                                    <input type="submit"
                                           class="btn btn-heylin"
                                           value="送出">
                                    <input type="reset"
                                           class="btn btn-secondary"
                                           value="清除">
                            </div>
                    </form>
        </div>
</template>
