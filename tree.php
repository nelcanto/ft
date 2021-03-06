<div class="family-tree bootstrap-styles">
  <div class="myClass">
    <svg></svg>
  </div>

  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="node-modal" tabindex="-1" role="dialog" aria-labelledby="familyTreeNodeModal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">

          <div class="modal-body">
            <div class="row">
              <div class="alert alert-danger" role="alert" style="display: none;">Unable to upload image</div>
              <input type="file" name="fileToUpload" class="hide" />
              <div class="col-md-3">
                <div class="profile-image-container">
                  <img class='profile-img' style='height: 100px; width: 100px; object-fit: fill' src="https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg"/>
                  <label>上傳照片</label>
                </div>
              </div>
              <div class="col-md-4">
                <h3 class='node-name'></h3>
              </div>
              <div class="col-md-4">
                <h3 class='node-dob'></h3>
              </div>
            </div>
            <br>
            <div class="node-options-pane">
              <button class="btn btn-primary btn-view-tree" data-dismiss="modal"><span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span><br/> 族谱</button>

              <a class="btn btn-primary" href="http://google.com" role="button"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><br/> 信息</a>

              <a class="btn btn-primary btn-edit" href="#" role="button"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><br/> 修改</a>

              <button class="btn btn-primary btn-add-relative"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><br/> 添加</button>

              <button class="btn btn-primary btn-delete" data-dismiss="modal"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span><br/> 删除</button>
            </div>
            <div class="hidden add-relative-pane">
              <h4>选者要添加关系</h4>
              <div class="relationship-list">
                <a href="#" class="list-group-item father" data-value=1><span class="glyphicon glyphicon-plus"></span> 父亲</a>
                <a href="#" class="list-group-item mother" data-value=2><span class="glyphicon glyphicon-plus"></span> 母亲</a>
                <a href="#" class="list-group-item spouse" data-value=3><span class="glyphicon glyphicon-plus"></span> 配偶</a>
                <a href="#" class="list-group-item sibling" data-value=4><span class="glyphicon glyphicon-plus"></span> 兄弟、姐妹</a>
                <a href="#" class="list-group-item child" data-value=5><span class="glyphicon glyphicon-plus"></span> 儿女</a>
              </div>
            </div>

            <div class="hidden add-relative-form-pane">
              <h4>添加个<span class='add-relationship-type'>配偶</span></h4>
              <form action="javascript:void(0);">
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="firstName">名</label>
                    <input type="text" class="form-control" name="firstName">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="lastName">姓</label>
                    <input type="text" class="form-control" name="lastName">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="gender">性别</label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" value="1" > 男
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" value="2"> 女
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" value="3"> 未知
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="status">状态</label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="1"> 在世
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="2"> 已故
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="3"> 未知
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="birth">生日</label>
                    <input type="date" class="form-control" name="birth">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="birthPlace">出身地点</label>
                    <input type="text" class="form-control" name="birthPlace">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="death">过世日期</label>
                    <input type="date" class="form-control" name="death">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="dealthPlace">过世地点</label>
                    <input type="text" class="form-control" name="deathPlace">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email">
                  </div>
                </div>
                <br/>
                <input type="text" name="image" class="hide" />
                <button type="submit" class="btn btn-primary">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>