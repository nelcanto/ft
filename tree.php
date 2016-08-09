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
              <div class="alert alert-danger" role="alert" style="display: none;"><?php _e('图片无法上传','family-tree');?></div>
              <input type="file" name="fileToUpload" class="hide" />
              <div class="col-md-3">
                <div class="profile-image-container">
                  <img class='profile-img' style='height: 100px; width: 100px; object-fit: fill' src="https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg"/>
                  <label><?php _e('上传图片','family-tree');?></label>
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
              <button class="btn btn-primary btn-view-tree" data-dismiss="modal"><span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span><br/> <?php _e('族谱','family-tree'); ?></button>

              <a class="btn btn-primary btn-vInfo" role="button"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><br/> <?php _e('信息','family-tree');?></a>

              <a class="btn btn-primary btn-edit" href="#" role="button" style="display: none;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><br/> <?php _e('修改','family-tree');?></a>

              <button class="btn btn-primary btn-add-relative"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><br/> <?php _e('添加','family-tree');?></button>

              <button class="btn btn-primary btn-delete" data-dismiss="modal" style="display: none;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span><br/> <?php _e('删除','family-tree');?></button>
            </div>
            <div class="hidden add-relative-pane">
              <h4><?php _e('选择要添加关系','family-tree');?></h4>
              <div class="relationship-list">
                <a href="#" class="list-group-item father" data-value=1><span class="glyphicon glyphicon-plus"></span> <?php _e('父亲','family-tree');?></a>
                <a href="#" class="list-group-item mother" data-value=2><span class="glyphicon glyphicon-plus"></span> <?php _e('母亲','family-tree');?></a>
                <a href="#" class="list-group-item spouse" data-value=3><span class="glyphicon glyphicon-plus"></span> <?php _e('配偶','family-tree');?></a>
                <a href="#" class="list-group-item sibling" data-value=4><span class="glyphicon glyphicon-plus"></span> <?php _e('兄弟、姐妹','family-tree');?></a>
                <a href="#" class="list-group-item child" data-value=5><span class="glyphicon glyphicon-plus"></span> <?php _e('儿女','family-tree');?></a>
              </div>
            </div>

            <div class="hidden add-relative-form-pane">
              <h4><?php _e('添加个','family-tree');?><span class='add-relationship-type'><?php _e('配偶','family-tree');?></span></h4>
              <form action="javascript:void(0);">
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="firstName"><?php _e('名','family-tree');?></label>
                    <input type="text" class="form-control" name="firstName">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="lastName"><?php _e('姓','family-tree');?></label>
                    <input type="text" class="form-control" name="lastName">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="gender"><?php _e('性别','family-tree');?></label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" value="1" checked> <?php _e('男','family-tree');?>
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" value="2"> <?php _e('女','family-tree');?>
                    </label>
<!--                     <label class="radio-inline">
                      <input type="radio" name="gender" value="3"> 未知
                    </label> -->
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="status"><?php _e('状态','family-tree');?></label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="1"> <?php _e('在世','family-tree');?>
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="2"> <?php _e('已故','family-tree');?>
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="status" value="3"> <?php _e('未知','family-tree');?>
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="birth"><?php _e('生日','family-tree');?></label>
                    <input type="date" class="form-control" name="birth">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="birthPlace"><?php _e('出生地点','family-tree');?></label>
                    <input type="text" class="form-control" name="birthPlace">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="death"><?php _e('过世日期','family-tree');?></label>
                    <input type="date" class="form-control" name="death">
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="dealthPlace"><?php _e('过世地点','family-tree');?></label>
                    <input type="text" class="form-control" name="deathPlace">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-xs-12">
                    <label for="email"><?php _e('电子邮箱','family-tree');?></label>
                    <input type="email" class="form-control" name="email" required>
                  </div>
                </div>
                <br/>
                <input type="text" name="image" class="hide" />
                <button type="submit" class="btn btn-primary"><?php _e('保存','family-tree');?></button>
                <button type="button" class="btn btn-default" data-dismiss="modal"><?php _e('取消','family-tree');?></button>
              </form>
            </div>

            <div class="hidden view-info-pane">
              <table>
                <div class="row">
                  <div class="form-group col-xs-6">
                    <label for="firstName"><?php _e('名','family-tree');?></label>
                    <span id="firstName"></span>
                  </div>
                  <div class="form-group col-xs-6">
                    <label for="lastName"><?php _e('姓','family-tree');?></label>
                    <span id="lastName"></span>
                  </div>
                </div>
                  <div class="row">
                    <div class="form-group col-xs-6">
                      <label for="gender"><?php _e('性别','family-tree');?></label>
                        <span id="gender"></span>
                    </div>
                    <div class="form-group col-xs-6 hidden">
                      <label for="wp_id">wp_id</label>
                        <span id="wp_id"></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-xs-12">
                      <label for="status"><?php _e('状态','family-tree');?></label>
                        <span id="status" ></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-xs-6">
                      <label for="birth"><?php _e('生日','family-tree');?></label>
                      <span id="birth"></span>
                    </div>
                    <div class="form-group col-xs-6">
                      <label for="birthPlace"><?php _e('出生地点','family-tree');?></label>
                      <span id="birthPlace"></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-xs-6">
                      <label for="death"><?php _e('过世日期','family-tree');?></label>
                      <span id="death"></span>
                    </div>
                    <div class="form-group col-xs-6">
                      <label for="dealthPlace"><?php _e('过世地点','family-tree');?></label>
                      <span id="deathPlace"></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-xs-12">
                      <label for="email"><?php _e('电子邮箱','family-tree');?></label>
                      <span id="email"></span>
                    </div>
                  </div>
                  <br/>
                </table>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</div>