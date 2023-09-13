export const xxfnd_node_scheduler = {
  get_schedule: `
            BEGIN
            xxfnd_node_scheduler.get_schedule(
                p_cursor => :cursor,
                p_fusion_domain => :domain,
                p_fusion_uname => :username,
                p_fusion_pwd => :password,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
  get_table_columns: `
        BEGIN
        xxfnd_node_scheduler.get_table_columns(
                p_table_name => :table_name,
                p_cursor => :cursor,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
  ins_schdl_list: `
        BEGIN
        xxfnd_node_scheduler.ins_schdl_list(
                p_schedule_id => :schedule_id,
                p_table_name => :table_name,
                p_schdl_list => :schedule_list,
                p_table_struct => :table_structure,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
  execute_merge_query: `
        BEGIN
        xxfnd_node_scheduler.execute_merge_query(
                p_table_name => :table_name,
                p_merge => :query,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
  upd_schdl_list_status: `
        BEGIN
        xxfnd_node_scheduler.upd_schdl_list_status(
                p_schdl_list_id => :schdl_list_id,
                p_status => :status,
                p_err_msg => :err_msg
            );
            END;
        `,
};
